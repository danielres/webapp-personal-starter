import type { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SigninMutationVariables } from "src/generated/operations"
import { sdk } from "../../sdk"
import { ApolloErrors } from "./ui/forms/ApolloErrors"
import { FormRow } from "./ui/forms/FormRow"
import { InputEmail } from "./ui/forms/InputEmail"
import { InputPassword } from "./ui/forms/InputPassword"

type ProtectedProps = {
  children: React.ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const formMethods = useForm()
  const { data, error, revalidate } = sdk.useMe()
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>([])

  const onSubmit = async (vars: SigninMutationVariables) => {
    try {
      await sdk.Signin(vars)
      await revalidate()
      setApolloErrors([])
    } catch ({ response }) {
      setApolloErrors(response.errors)
    }
  }

  const isLoading = !data && !error

  if (isLoading) return <div>Loading...</div>

  if (data?.me) return <>{children}</>

  return (
    <>
      <ApolloErrors errors={apolloErrors} />

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <FormRow>
            <InputEmail />
          </FormRow>

          <FormRow>
            <InputPassword />
          </FormRow>

          <FormRow>
            <button type="submit">Sign in</button>
          </FormRow>
        </form>
      </FormProvider>
    </>
  )
}
