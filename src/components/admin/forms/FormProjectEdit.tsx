import { ApolloError } from "apollo-server-micro"
import classnames from "classnames"
import Link from "next/link"
import React, { useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import Select from "react-select"
import { sdk } from "../../../sdk"
import type { Project } from "../../../generated/operations"
import { getPath } from "../../../getPath"
import { isProjectName } from "../../../validators/isProjectName"
import { messages } from "../../../validators/messages"
import { Button } from "../../ui/Button"
import { ApolloErrors } from "../../ui/forms/ApolloErrors"
import { FormRow } from "../../ui/forms/FormRow"
import { InputText } from "../../ui/forms/InputText"
import { Stack } from "../../ui/Stack"
import { Time } from "../../ui/Time"

type FormProjectEditProps = {
  project: Project
  onSuccess: () => void
}

type SelectOption = {
  label: string
  value: string
}

export function FormProjectEdit({ project, onSuccess }: FormProjectEditProps) {
  const formMethods = useForm({ defaultValues: project ?? undefined })
  const { data: usersData } = sdk.useUsers()
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [removedMemberIds, setRemovedMemberIds] = useState<number[]>([])

  if (!project) return null

  const removeMemberById = (id: number) =>
    setRemovedMemberIds([...removedMemberIds, id])

  const selectOptions = usersData?.users
    .filter(
      (user) => !project.members.map((member) => member?.id).includes(user?.id)
    )
    .map((user) => ({
      value: user?.id,
      label: user?.name,
    }))

  const restoreMemberById = (memberId: number) =>
    setRemovedMemberIds(removedMemberIds.filter((id) => id !== memberId))

  const [selectKey, setSelectKey] = useState(1)
  const clearSelect = () => setSelectKey(selectKey + 1)

  const resetForm = () => {
    clearSelect()
    setRemovedMemberIds([])
  }

  const onSubmit = async ({ newMembers = [], ...vars }: any) => {
    const newMemberIds = newMembers.map(
      (newMember: SelectOption) => newMember.value
    )

    setIsSubmitting(true)
    try {
      await sdk.ProjectUpdate({
        ...vars,
        newMemberIds,
        removedMemberIds,
        id: project.id,
      })
      setApolloErrors(undefined)
      clearSelect()
      setRemovedMemberIds([])
      onSuccess()
    } catch ({ response }) {
      setApolloErrors(response.errors)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col gap-8 sm:flex-row">
        <Stack className="sm:w-2/3">
          <ApolloErrors errors={apolloErrors} />

          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <Stack>
              <FormRow>
                <div className="inline-grid grid-cols-2">
                  <div>Id</div>
                  <div>{project.id}</div>
                  <div>Created at</div>
                  <div>
                    <Time time={project.createdAt} />
                  </div>
                  <div>Updated at</div>
                  <div>
                    {project.createdAt !== project.updatedAt && (
                      <Time time={project.updatedAt} />
                    )}
                  </div>
                </div>
              </FormRow>

              <FormRow label="Project name">
                <InputText
                  name="name"
                  validate={(v) => isProjectName(v) || messages.ProjectName}
                />
              </FormRow>

              <FormRow label="Add members">
                <Controller
                  className="w-full"
                  placeholder="Select..."
                  as={Select}
                  key={selectKey}
                  name="newMembers"
                  options={selectOptions}
                  isMulti
                  control={formMethods.control}
                />
              </FormRow>

              <div className="flex justify-between">
                {isSubmitting ? (
                  <span className="animate-fadein-slow">Updating...</span>
                ) : (
                  <Button variant="secondary" type="submit">
                    Apply changes
                  </Button>
                )}
                <Button variant="text" type="button" onClick={resetForm}>
                  Reset
                </Button>
              </div>
            </Stack>
          </form>
        </Stack>

        <Stack
          spacing="sm"
          className="pt-8 border-t border-gray-200 sm:w-1/3 sm:border-l sm:border-t-0 sm:pt-0 sm:px-8"
        >
          <h2 className="text-gray-700">
            Members{" "}
            <span className="text-sm text-gray-500">
              ({project.members.length})
            </span>
          </h2>

          <ProjectMembersList
            members={project.members}
            removedMemberIds={removedMemberIds}
            restoreMemberById={restoreMemberById}
            removeMemberById={removeMemberById}
          />
        </Stack>
      </div>
    </FormProvider>
  )
}

type ProjectMembersListProps = {
  members: Project["members"]
  removedMemberIds: number[]
  removeMemberById: (id: number) => void
  restoreMemberById: (id: number) => void
}

function ProjectMembersList({
  members,
  removedMemberIds,
  removeMemberById,
  restoreMemberById,
}: ProjectMembersListProps) {
  if (members.length === 0)
    return <p className="text-gray-500">This project has no members</p>

  return (
    <Stack className="text-sm" spacing="xs">
      {members.map(
        (member) =>
          member && (
            <div key={member.id} className="flex justify-between">
              <Link href={getPath.admin.users.edit(member.id)}>
                <Button
                  as="a"
                  variant="text"
                  padding="none"
                  title={member.email}
                >
                  <span
                    className={classnames({
                      "line-through text-red-700": removedMemberIds.includes(
                        member.id
                      ),
                    })}
                  >
                    {member?.name}
                  </span>
                </Button>
              </Link>

              <Button
                type="button"
                onClick={() =>
                  removedMemberIds.includes(member.id)
                    ? restoreMemberById(member.id)
                    : removeMemberById(member.id)
                }
                padding="none"
                variant="text"
              >
                {removedMemberIds.includes(member.id) ? "Cancel" : "Remove"}
              </Button>
            </div>
          )
      )}
    </Stack>
  )
}
