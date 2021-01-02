import React from "react"
import { sdk } from "../../sdk"
import { FormSignin } from "./forms/FormSignin"

type ProtectedProps = {
  children: React.ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const { data, error, revalidate } = sdk.useMe()

  const isLoading = !data && !error

  if (isLoading) return <div>Loading...</div>
  if (data?.me) return <>{children}</>

  return (
    <div className="card max-w-lg mx-auto mt-8">
      <FormSignin onSuccess={revalidate} />
    </div>
  )
}
