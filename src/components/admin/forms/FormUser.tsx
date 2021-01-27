import { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { sdk } from "../../../sdk"
import { User } from "../../../generated/operations"
import { isEmail } from "../../../validators/isEmail"
import { isName } from "../../../validators/isName"
import { messages } from "../../../validators/messages"
import { Button } from "../../ui/Button"
import { ApolloErrors } from "../../ui/forms/ApolloErrors"
import { FormRow } from "../../ui/forms/FormRow"
import { InputCheckbox } from "../../ui/forms/InputCheckbox"
import { InputText } from "../../ui/forms/InputText"
import { Stack } from "../../ui/Stack"
import { Time } from "../../ui/Time"

type FormUserProps = {
  onSuccess?: () => void
  user: User
}

export function FormUser({ onSuccess, user }: FormUserProps) {
  const formMethods = useForm({ defaultValues: user })
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>()

  const onSubmit = async (vars: any) => {
    try {
      await sdk.UserUpdate({ ...vars, id: Number(user.id) })
      setApolloErrors(undefined)
      onSuccess && onSuccess()
    } catch ({ response }) {
      setApolloErrors(response.errors)
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
                <div>{user.id}</div>
                <div>Created at</div>
                <div>
                  <Time time={user.createdAt} />
                </div>
                <div>Updated at</div>
                <div>
                  {user.createdAt !== user.updatedAt && (
                    <Time time={user.updatedAt} />
                  )}
                </div>
                <div>Superuser</div>
                <div>
                  <InputCheckbox name="isSuperUser" />
                </div>
                <div>Approved</div>
                <div>
                  <InputCheckbox name="isApproved" />
                </div>
              </div>
            </FormRow>

            <FormRow label="Full name">
              <InputText
                name="name"
                validate={(v) => isName(v) || messages.Name}
              />
            </FormRow>

            <FormRow label="Email">
              <InputText
                name="email"
                validate={(v) => isEmail(v) || messages.Email}
              />
            </FormRow>

            <FormRow>
              <div className="flex justify-between">
                <Button type="submit" variant="primary">
                  Update user
                </Button>
              </div>
            </FormRow>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  )
}
