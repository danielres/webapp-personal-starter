import { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import zxcvbn from "zxcvbn"
import * as config from "../../../config"
import { sdk } from "../../sdk"
import { SignupMutationVariables } from "../../generated/operations"
import { isName } from "../../validators/isName"
import { isPassword } from "../../validators/isPassword"
import { messages } from "../../validators/messages"
import { Button } from "../ui/Button"
import { ApolloErrors } from "../ui/forms/ApolloErrors"
import { FormRow } from "../ui/forms/FormRow"
import { InputText } from "../ui/forms/InputText"
import { PasswordStrengthLabel } from "../ui/forms/PasswordStrengthLabel"
import { PasswordStrengthMeter } from "../ui/forms/PasswordStrengthMeter"
import { Stack } from "../ui/Stack"

type FormSignupWithInvitationProps = {
  onSuccess: () => void
  secret: string
}

const getDefaultValues = () => {
  if (!config.isDev) return undefined

  const rand = Math.floor(Math.random() * 1000)
  return {
    name: `user-${rand}`,
    email: `user-${rand}@example.com`,
    password: `big-brown-fox`,
    password2: `big-brown-fox`,
  }
}

export const FormSignupWithInvitation = ({
  onSuccess,
  secret,
}: FormSignupWithInvitationProps) => {
  const formMethods = useForm({ defaultValues: getDefaultValues() })
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>([])

  const onSubmit = async (
    vars: SignupMutationVariables & { password2: string }
  ) => {
    const { password2, ...rest } = vars
    try {
      await sdk.SignupWithInvitation({ ...rest, secret })
      onSuccess()
      setApolloErrors([])
    } catch ({ response }) {
      setApolloErrors(response.errors)
    }
  }

  const passwordValue = formMethods.watch("password")
  const passwordScore = zxcvbn(passwordValue || "").score

  return (
    <Stack>
      <ApolloErrors errors={apolloErrors} />

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack>
            <FormRow label="Full name">
              <InputText
                name="name"
                validate={(v) => isName(v) || messages.Name}
              />
            </FormRow>

            <FormRow label="Password">
              <>
                <div className="mb-2">
                  <InputText
                    name="password"
                    validate={(v) => {
                      if (passwordScore < 3) return "not strong enough"
                      if (!isPassword(v)) return messages.Password
                      return true
                    }}
                    type="password"
                  />
                </div>
                <PasswordStrengthMeter value={passwordScore} />
                <PasswordStrengthLabel value={passwordScore} />
              </>
            </FormRow>

            <FormRow label="Password (repeat)">
              <InputText
                name="password2"
                validate={(v) => passwordValue === v || "doesn't match"}
                type="password"
              />
            </FormRow>

            <FormRow>
              <div className="flex justify-between">
                <Button type="submit" variant="primary">
                  Create my account
                </Button>
              </div>
            </FormRow>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  )
}
