import type { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { isName } from "src/validators/isName"
import { messages } from "src/validators/messages"
import { sdk } from "../../../sdk"
import { ApolloErrors } from "../ui/forms/ApolloErrors"
import { FormRow } from "../ui/forms/FormRow"
import { InputCheckbox } from "../ui/forms/InputCheckbox"
import { InputEmail } from "../ui/forms/InputEmail"
import { InputText } from "../ui/forms/InputText"
import type { User } from "../../generated/operations"
import { useRouter } from "next/router"

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
          <div>ID: {user.id}</div>

          <div>Created at: {user.createdAt}</div>

          {user.createdAt !== user.updatedAt && (
            <div>Updated at: {user.updatedAt}</div>
          )}

          <FormRow>
            <InputEmail />
          </FormRow>

          <FormRow>
            <InputText
              name="name"
              validate={(v) => isName(v) || messages.Name}
            />
          </FormRow>

          <FormRow>
            Superuser? <InputCheckbox name="isSuperUser" />
          </FormRow>

          <FormRow>
            <button type="submit">Update user</button>
          </FormRow>
        </form>
      </FormProvider>
    </>
  )
}
