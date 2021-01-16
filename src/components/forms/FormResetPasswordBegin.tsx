import { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import zxcvbn from "zxcvbn"
import * as config from "../../../config"
import { ResetPasswordBeginMutationVariables } from "../../generated/operations"
import { sdk } from "../../../sdk"
import { isEmail } from "../../validators/isEmail"
import { isPassword } from "../../validators/isPassword"
import { messages } from "../../validators/messages"
import { Button } from "../ui/Button"
import { ApolloErrors } from "../ui/forms/ApolloErrors"
import { FormRow } from "../ui/forms/FormRow"
import { InputText } from "../ui/forms/InputText"
import { PasswordStrengthLabel } from "../ui/forms/PasswordStrengthLabel"
import { PasswordStrengthMeter } from "../ui/forms/PasswordStrengthMeter"
import { Stack } from "../ui/Stack"

type FormSignupProps = {
  onSuccess: () => void
}

export const FormResetPasswordBegin = ({ onSuccess }: FormSignupProps) => {
  // const formMethods = useForm({ defaultValues: getDefaultValues() })
  const formMethods = useForm()
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>([])

  const onSubmit = async (
    vars: ResetPasswordBeginMutationVariables & { password2: string }
  ) => {
    const { password2, ...rest } = vars
    console.log({ vars })

    try {
      await sdk.ResetPasswordBegin(rest)
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
            <FormRow label="Email">
              <InputText
                name="email"
                validate={(v) => isEmail(v) || messages.Email}
              />
            </FormRow>

            <FormRow label="New password">
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

            <FormRow label="New password (repeat)">
              <InputText
                name="password2"
                validate={(v) => passwordValue === v || "doesn't match"}
                type="password"
              />
            </FormRow>

            <FormRow>
              <div className="flex justify-between">
                <Button type="submit" variant="primary">
                  Reset my password
                </Button>
              </div>
            </FormRow>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  )
}
