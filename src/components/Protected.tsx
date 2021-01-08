import { ApolloError } from "apollo-server-micro"
import React, { useState } from "react"
import { sdk } from "../../sdk"
import { FormSignin } from "./forms/FormSignin"
import { Alert } from "./ui/Alert"
import { Button } from "./ui/Button"
import { Card } from "./ui/Card"
import { ApolloErrors } from "./ui/forms/ApolloErrors"
import { H2 } from "./ui/H2"
import { Stack } from "./ui/Stack"

type ProtectedProps = {
  children: React.ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const { data, error, revalidate } = sdk.useMe()

  const isLoading = !data && !error

  if (isLoading) return <div>Loading...</div>

  if (data?.me && !data.me.emailVerifiedAt)
    return (
      <div className="max-w-lg mx-auto mt-8">
        <Card className="animate-fadein-slow">
          <DialogEmailVerificationNeeded email={data.me.email} />
        </Card>
      </div>
    )

  if (data?.me) return <>{children}</>

  return (
    <div className="max-w-lg mx-auto mt-8">
      <Card className="animate-fadein-slow">
        <FormSignin onSuccess={revalidate} />
      </Card>
    </div>
  )
}

function DialogEmailVerificationNeeded({ email }: { email: string }) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>()

  const onClick = async () => {
    try {
      await sdk.resendVerificationEmail()
      setApolloErrors(undefined)
      setIsSuccess(true)
    } catch ({ response }) {
      setApolloErrors(response.errors)
    }
  }

  return (
    <Stack className="text-center text-gray-700">
      <ApolloErrors errors={apolloErrors} />

      <H2 className="text-gray-600">Email verification needed</H2>
      {isSuccess ? (
        <>
          <Alert variant="success">
            <p>
              Email sent to <br />
              <b>{email}</b>
            </p>
          </Alert>
          <p>Please check your mailbox for instructions.</p>
        </>
      ) : (
        <>
          <p>
            You need to verify your email in order to continue.
            <br />
            Please check your mailbox for instructions.
          </p>
          <Button variant="primary" onClick={onClick}>
            Resend instructions
          </Button>
        </>
      )}
    </Stack>
  )
}
