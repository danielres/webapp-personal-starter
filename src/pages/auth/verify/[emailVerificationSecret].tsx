import { ApolloError } from "apollo-server-micro"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { sdk } from "../../../../sdk"
import { FormSignin } from "../../../components/forms/FormSignin"
import { Card } from "../../../components/ui/Card"
import { Container } from "../../../components/ui/Container"
import { ApolloErrors } from "../../../components/ui/forms/ApolloErrors"
import { H1 } from "../../../components/ui/H1"
import { Spinner } from "../../../components/ui/Spinner"
import { Stack } from "../../../components/ui/Stack"
import { VerifyEmailResponse } from "../../../generated/operations"

export default function EmailConfirmationPage() {
  const { query } = useRouter()
  const secret = query?.emailVerificationSecret as string | undefined

  return (
    <Container variant="dialog">
      <Card className="animate-fadein-slow">
        {secret && <EmailConfirmation secret={secret} />}
      </Card>
    </Container>
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
      <Stack className="mb-12 text-center">
        <H1 className="text-gray-600">
          Welcome{data.name ? ` ${data.name}` : ""}!
        </H1>

        <p>Your email has been successfully verified.</p>

        <p>You can now sign in using your email + password.</p>
      </Stack>

      <FormSignin
        defaultValues={{ email: data.email }}
        hasRegisterButton={false}
        onSuccess={() => router.push("/")}
      />
    </Stack>
  )
}
