import { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SigninMutationVariables } from "src/generated/operations"
import { isEmail } from "src/validators/isEmail"
import { isPassword } from "src/validators/isPassword"
import { messages } from "src/validators/messages"
import { sdk } from "../../../sdk"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { ApolloErrors } from "../ui/forms/ApolloErrors"
import { FormRow } from "../ui/forms/FormRow"
import { InputText } from "../ui/forms/InputText"
import { Stack } from "../ui/Stack"

type FormSigninProps = {
  onSuccess: () => void
}

export const FormSignin = ({ onSuccess }: FormSigninProps) => {
  const formMethods = useForm()
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>([])

  const onSubmit = async (vars: SigninMutationVariables) => {
    try {
      await sdk.Signin(vars)
      onSuccess()
      setApolloErrors([])
    } catch ({ response }) {
      setApolloErrors(response.errors)
    }
  }

  return (
    <div className="animate-fadein-slow">
      <Card>
        <ApolloErrors errors={apolloErrors} />

        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <Stack>
              <FormRow label="Email">
                <InputText
                  name="email"
                  validate={(v) => isEmail(v) || messages.Email}
                />
              </FormRow>

              <FormRow label="Password">
                <InputText
                  name="password"
                  validate={(v) => isPassword(v) || messages.Password}
                  type="password"
                />
              </FormRow>

              <FormRow>
                <Button type="submit" variant="primary">
                  Sign in
                </Button>
              </FormRow>
            </Stack>
          </form>
        </FormProvider>
      </Card>
    </div>
  )
}
