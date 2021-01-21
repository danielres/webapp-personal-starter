import { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { sdk } from "../../../../sdk"
import type { Project } from "../../../generated/operations"
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

export function FormProjectEdit({ project, onSuccess }: FormProjectEditProps) {
  const formMethods = useForm({ defaultValues: project })
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (vars: any) => {
    setIsSubmitting(true)
    try {
      await sdk.ProjectCreate(vars)
      setApolloErrors(undefined)
      onSuccess()
    } catch ({ response }) {
      setApolloErrors(response.errors)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Stack>
      <ApolloErrors errors={apolloErrors} />

      <FormProvider {...formMethods}>
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

            <div className="flex justify-between">
              {isSubmitting ? (
                <span className="animate-fadein-slow">Updating...</span>
              ) : (
                <Button variant="secondary" type="submit">
                  Update project
                </Button>
              )}
            </div>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  )
}
