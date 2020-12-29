import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SigninMutationVariables } from "src/generated/operations"
import { sdk } from "../../sdk"
import { ErrorResponse, ServerErrorResponse } from "./ui/forms/ErrorResponse"
import { InputEmail } from "./ui/forms/InputEmail"
import { InputPassword } from "./ui/forms/InputPassword"

type ProtectedProps = {
  children: React.ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const formMethods = useForm()
  const { data, error, revalidate } = sdk.useMe()
  const [errorResponse, setErrorResponse] = useState<ServerErrorResponse>()

  const onSubmit = async (vars: SigninMutationVariables) => {
    try {
      await sdk.Signin(vars)
      await revalidate()
      setErrorResponse(undefined)
    } catch (error) {
      setErrorResponse(error)
    }
  }

  const isLoading = !data && !error

  if (isLoading) return <div>Loading...</div>

  if (data?.me) return <>{children}</>

  return (
    <>
      <ErrorResponse response={errorResponse} />

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div>
            <InputEmail />
          </div>

          <div>
            <InputPassword />
          </div>

          <div>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
