import Link from "next/link"
import React from "react"
import { sdk } from "../../sdk"
import { getPath } from "../getPath"
import { Alert } from "./ui/Alert"
import { Button } from "./ui/Button"
import { Card } from "./ui/Card"
import { Container } from "./ui/Container"
import { Spinner } from "./ui/Spinner"
import { Stack } from "./ui/Stack"

type SuperUserOnlyProps = {
  children: React.ReactNode
  silent?: boolean
}

export const SuperUserOnly = ({
  children,
  silent = true,
}: SuperUserOnlyProps) => {
  const fromCacheOnly = { revalidateOnMount: false }
  const { data } = sdk.useMe(undefined, fromCacheOnly)

  if (!data?.me?.isSuperUser && silent) return null

  if (!data?.me?.isSuperUser)
    return (
      <Container variant="dialog" className="text-center">
        <Card>
          <Stack>
            <Alert variant="danger">Access forbidden</Alert>
            <Link href={getPath.home()} passHref>
              <Button variant="text" as="a">
                Return to the homepage
              </Button>
            </Link>
          </Stack>
        </Card>
      </Container>
    )

  if (!data?.me) return <Spinner />

  return <>{children}</>
}
