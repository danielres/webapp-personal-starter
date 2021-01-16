import Link from "next/link"
import React from "react"
import { getPath } from "../../getPath"
import { Check } from "../Icons/Check"
import { InlineIcon } from "../Icons/InlineIcon"
import { Alert } from "../ui/Alert"
import { Button } from "../ui/Button"
import { Stack } from "../ui/Stack"

export function FormResetPasswordBeginSuccess() {
  return (
    <Stack className="text-center">
      <Alert variant="success">
        <InlineIcon>
          <Check />
        </InlineIcon>{" "}
        Your request to reset your password has been submitted
      </Alert>

      <p>Please check your mailbox for further instructions.</p>

      <Link href={getPath.home()} passHref>
        <Button variant="primary" as="a">
          Ok
        </Button>
      </Link>
    </Stack>
  )
}
