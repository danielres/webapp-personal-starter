import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { sdk } from "../../../../sdk"
import { getPath } from "../../../api/getPath"
import { FormSignupWithInvitation } from "../../../components/forms/FormSignupWithInvitation"
import { Check } from "../../../components/Icons/Check"
import { InlineIcon } from "../../../components/Icons/InlineIcon"
import { Alert } from "../../../components/ui/Alert"
import { Button } from "../../../components/ui/Button"
import { Card } from "../../../components/ui/Card"
import { Container } from "../../../components/ui/Container"
import { H2 } from "../../../components/ui/H2"
import { Stack } from "../../../components/ui/Stack"

export default function PageSignupWithInvitation() {
  const { data } = sdk.useMe()
  const router = useRouter()
  const secret = router.query?.emailInvitationSecret as string | undefined
  const [isSuccess, setIsSuccess] = useState(false)
  const onSuccess = () => setIsSuccess(true)

  if (data?.me || !secret) {
    router.push("/")
    return null
  }

  return (
    <Container variant="dialog">
      <Card className="animate-fadein-slow">
        {isSuccess ? (
          <SuccessMessage />
        ) : (
          <div>
            <H2>Please enter your name and create your password</H2>
            <FormSignupWithInvitation onSuccess={onSuccess} secret={secret} />
          </div>
        )}
      </Card>
    </Container>
  )
}

function SuccessMessage() {
  return (
    <Stack className="text-center">
      <H2>Welcome!</H2>

      <Alert variant="success">
        <InlineIcon>
          <Check />
        </InlineIcon>

        <span className="ml-1">Account created</span>
      </Alert>

      <p>You can now sign in using your email + password</p>

      <Link href={getPath.home()} passHref>
        <Button as="a" variant="primary">
          Sign in
        </Button>
      </Link>
    </Stack>
  )
}
