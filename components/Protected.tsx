import { SigninMutationVariables } from "generated/operations"
import React from "react"
import { useForm } from "react-hook-form"
import { sdk } from "../sdk"

type ProtectedProps = {
  children: React.ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const { handleSubmit, register } = useForm()
  const { data, error, revalidate } = sdk.useMe()

  const onSubmit = async (vars: SigninMutationVariables) => {
    await sdk.Signin(vars)
    await revalidate()
  }

  const isLoading = !data && !error

  if (isLoading) return <div>Loading...</div>

  if (data?.me) return <>{children}</>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input name="email" ref={register} placeholder="email" />
      </div>

      <div>
        <input
          name="password"
          placeholder="password"
          ref={register}
          type="password"
        />
      </div>

      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  )
}
