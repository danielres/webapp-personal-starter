import type { ApolloError } from "apollo-server-micro"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { isEmail } from "src/validators/isEmail"
import { isName } from "src/validators/isName"
import { messages } from "src/validators/messages"
import { sdk } from "../../../sdk"
import type { User } from "../../generated/operations"
import { Button } from "../ui/Button"
import { ApolloErrors } from "../ui/forms/ApolloErrors"
import { FormRow } from "../ui/forms/FormRow"
import { InputCheckbox } from "../ui/forms/InputCheckbox"
import { InputText } from "../ui/forms/InputText"
import { Stack } from "../ui/Stack"

export function UserEditor({ id }: { id: number }) {
  const { data } = sdk.useUser({ id })

  if (!data?.user) return <div>Loading...</div>

  return <UserEditorForm user={data.user} />
}

type UserEditorFormProps = {
  user: User
}

function UserEditorForm({ user }: UserEditorFormProps) {
  const formMethods = useForm({ defaultValues: user })
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>()
  const router = useRouter()

  const onSubmit = async (vars: any) => {
    try {
      await sdk.UpdateUser({ ...vars, id: Number(user.id) })
      setApolloErrors(undefined)
      router.push("/admin")
    } catch ({ response }) {
      setApolloErrors(response.errors)
    }
  }

  return (
    <>
      <ApolloErrors errors={apolloErrors} />

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack>
            <div>ID: {user.id}</div>

            <div>
              <div>Created at: {user.createdAt}</div>

              {user.createdAt !== user.updatedAt && (
                <div>Updated at: {user.updatedAt}</div>
              )}
            </div>

            <FormRow label="Email">
              <InputText
                name="email"
                validate={(v) => isEmail(v) || messages.Email}
              />
            </FormRow>

            <FormRow label="Name">
              <InputText
                name="name"
                validate={(v) => isName(v) || messages.Name}
              />
            </FormRow>

            <FormRow>
              Superuser? <InputCheckbox name="isSuperUser" />
            </FormRow>

            <FormRow>
              <Button type="submit" variant="primary">
                Update user
              </Button>
            </FormRow>
          </Stack>
        </form>
      </FormProvider>
    </>
  )
}
