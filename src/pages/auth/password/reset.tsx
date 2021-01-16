import { ApolloError } from "apollo-server-micro"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { sdk } from "../../../../sdk"
import { FormResetPasswordBegin } from "../../../components/forms/FormResetPasswordBegin"
import { FormResetPasswordBeginSuccess } from "../../../components/forms/FormResetPasswordBeginSuccess"
import { Check } from "../../../components/Icons/Check"
import { InlineIcon } from "../../../components/Icons/InlineIcon"
import { Alert } from "../../../components/ui/Alert"
import { Button } from "../../../components/ui/Button"
import { Card } from "../../../components/ui/Card"
import { Container } from "../../../components/ui/Container"
import { ApolloErrors } from "../../../components/ui/forms/ApolloErrors"
import { Stack } from "../../../components/ui/Stack"
import { getPath } from "../../../getPath"

export default function PageResetPassword() {
  const router = useRouter()
  const secret = router.query.secret as string | undefined

  const [isBeginSuccess, setIsBeginSuccess] = useState(false)
  const [isFinishSuccess, setIsFinishSuccess] = useState(false)
  const [apolloErrors, setApolloErrors] = useState<ApolloError[]>([])

  useEffect(() => {
    console.log(1, { secret })

    if (secret) {
      sdk
        .ResetPasswordFinish({ secret })
        .then(() => {
          console.log(2)
          setIsFinishSuccess(true)
        })
        .catch(({ response }) => setApolloErrors(response.errors))
    }
  }, [secret])

  if (isFinishSuccess)
    return (
      <Container variant="dialog">
        <Card className="text-center animate-fadein-slow">
          <Stack>
            <Alert variant="success">
              <InlineIcon>
                <Check />
              </InlineIcon>{" "}
              Password reset successful, you may now sign in using your new
              password
            </Alert>{" "}
            <Button variant="primary" as="a" href={getPath.signin()}>
              Sign in
            </Button>
          </Stack>
        </Card>
      </Container>
    )

  if (secret)
    return (
      <Container variant="dialog">
        <Card className="animate-fadein-slow">
          {isFinishSuccess ? (
            <FormResetPasswordBeginSuccess />
          ) : apolloErrors ? (
            <Stack className="text-center">
              <ApolloErrors errors={apolloErrors} />
              <Button
                as="a"
                href={getPath.password.reset.begin()}
                variant="primary"
              >
                Start over?
              </Button>
            </Stack>
          ) : (
            <Alert variant="info">Password reset in progress</Alert>
          )}
        </Card>
      </Container>
    )

  return (
    <Container variant="dialog">
      <Card className="animate-fadein-slow">
        {isBeginSuccess ? (
          <FormResetPasswordBeginSuccess />
        ) : (
          <Stack>
            <FormResetPasswordBegin onSuccess={() => setIsBeginSuccess(true)} />
          </Stack>
        )}
      </Card>
    </Container>
  )
}
