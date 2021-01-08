import { ApolloError } from "apollo-server-micro"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FormSignin } from "src/components/forms/FormSignin"
import { Card } from "src/components/ui/Card"
import { H1 } from "src/components/ui/H1"
import { Stack } from "src/components/ui/Stack"
import { VerifyEmailResponse } from "src/generated/operations"
import { sdk } from "../../../sdk"
import { ApolloErrors } from "../../components/ui/forms/ApolloErrors"

export default function EmailConfirmationPage() {
  const { query } = useRouter()
  const secret = query?.emailVerificationSecret as string | undefined

  return (
    <Card className="max-w-lg mx-auto mt-8">
      {secret ? <EmailConfirmation secret={secret} /> : <div>Loading...</div>}
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

  if (!data) return <div>"Loading..."</div>

  return (
    <Stack>
      <div className="mb-12 text-center">
        <H1 className="text-gray-600">
          Welcome{data.name ? ` ${data.name}` : ""}!
        </H1>

        <p className="text-gray-700">
          Your email has been successfully verified.
        </p>

        <p className="text-gray-700">
          You can now sign in using your email + password.
        </p>
      </div>

      <FormSignin
        defaultValues={{ email: data.email }}
        hasRegisterButton={false}
        onSuccess={() => router.push("/")}
      />
    </Stack>
  )
}
