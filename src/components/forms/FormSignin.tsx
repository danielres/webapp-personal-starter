import { ApolloError } from "apollo-server-micro"
import Link from "next/link"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { sdk } from "../../../sdk"
import { getPath } from "../../api/getPath"
import { SigninMutationVariables } from "../../generated/operations"
import { isEmail } from "../../validators/isEmail"
import { isPassword } from "../../validators/isPassword"
import { messages } from "../../validators/messages"
import { Button } from "../ui/Button"
import { ApolloErrors } from "../ui/forms/ApolloErrors"
import { FormRow } from "../ui/forms/FormRow"
import { InputText } from "../ui/forms/InputText"
import { Stack } from "../ui/Stack"

type FormSigninProps = {
  defaultValues?: {
    email: string | null | undefined
  }
  hasRegisterButton?: boolean
  onSuccess: () => void
}

export const FormSignin = ({
  defaultValues,
  hasRegisterButton = true,
  onSuccess,
}: FormSigninProps) => {
  const formMethods = useForm({ defaultValues })
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

            <FormRow label="Password">
              <InputText
                name="password"
                validate={(v) => isPassword(v) || messages.Password}
                type="password"
              />
            </FormRow>

            <FormRow>
              <div className="flex justify-between">
                <Button type="submit" variant="primary">
                  Sign in
                </Button>

                {hasRegisterButton && (
                  <Link href={getPath.signup.regular()} passHref>
                    <Button as="a" variant="text">
                      Register
                    </Button>
                  </Link>
                )}
              </div>
            </FormRow>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  )
}
