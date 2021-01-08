import { ApolloError } from "apollo-server-micro"
import Link from "next/link"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SignupMutationVariables } from "src/generated/operations"
import { isEmail } from "src/validators/isEmail"
import { isName } from "src/validators/isName"
import { isPassword } from "src/validators/isPassword"
import { messages } from "src/validators/messages"
import zxcvbn from "zxcvbn"
import { sdk } from "../../../sdk"
import { Button } from "../ui/Button"
import { ApolloErrors } from "../ui/forms/ApolloErrors"
import { FormRow } from "../ui/forms/FormRow"
import { InputText } from "../ui/forms/InputText"
import { PasswordStrengthLabel } from "../ui/forms/PasswordStrengthLabel"
import { PasswordStrengthMeter } from "../ui/forms/PasswordStrengthMeter"
import { Stack } from "../ui/Stack"
import * as config from "../../../config"

type FormSignupProps = {
  onSuccess: () => void
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

export const FormSignup = ({ onSuccess }: FormSignupProps) => {
  const formMethods = useForm({ defaultValues: getDefaultValues() })
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>([])

  const onSubmit = async (
    vars: SignupMutationVariables & { password2: string }
  ) => {
    const { password2, ...rest } = vars
    try {
      await sdk.Signup(rest)
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
            <FormRow label="Name">
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
                  Register
                </Button>

                <Link href="/">
                  <Button as="a" variant="text">
                    Sign in
                  </Button>
                </Link>
              </div>
            </FormRow>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  )
}
