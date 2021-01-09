import { ApolloError } from "apollo-server-micro"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FormSignin } from "src/components/forms/FormSignin"
import { Card } from "src/components/ui/Card"
import { H1 } from "src/components/ui/H1"
import { Spinner } from "src/components/ui/Spinner"
import { Stack } from "src/components/ui/Stack"
import { VerifyEmailResponse } from "src/generated/operations"
import { sdk } from "../../../sdk"
import { ApolloErrors } from "../../components/ui/forms/ApolloErrors"

export default function EmailConfirmationPage() {
  const { query } = useRouter()
  const secret = query?.emailVerificationSecret as string | undefined

  return (
    <Card className="max-w-lg mx-auto mt-8 animate-fadein-slow">
      {secret && <EmailConfirmation secret={secret} />}
    </Card>
  )
}

type EmailConfirmationProps = {
  secret: string
}

function EmailConfirmation({ secret }: EmailConfirmationProps) {
  const [data, setData] = useState<VerifyEmailResponse>()
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>()
  const router = useRouter()

  useEffect(() => {
    sdk
      .VerifyEmail({ emailVerificationSecret: secret })
      .then(({ verifyEmail }) => setData(verifyEmail))
      .catch(({ response }) => setApolloErrors(response.errors))
  }, [])

  if (apolloErrors) return <ApolloErrors errors={apolloErrors} />

  if (!data) return <Spinner />

  return (
    <Stack>
      <div className="mb-12 text-center text-gray-700">
        <H1 className="text-gray-600">
          Welcome{data.name ? ` ${data.name}` : ""}!
        </H1>

        <p>Your email has been successfully verified.</p>

        <p>You can now sign in using your email + password.</p>
      </div>

      <FormSignin
        defaultValues={{ email: data.email }}
        hasRegisterButton={false}
        onSuccess={() => router.push("/")}
      />
    </Stack>
  )
}
