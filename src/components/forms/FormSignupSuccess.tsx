import Link from "next/link"
import React from "react"
import { getPath } from "../../getPath"
import { Button } from "../ui/Button"
import { H1 } from "../ui/H1"
import { Stack } from "../ui/Stack"

export function FormSignupSuccess() {
  return (
    <Stack className="text-center">
      <H1 className="text-gray-600">Thank you for registering!</H1>

      <p>Please check your mailbox for further instructions.</p>

      <Link href={getPath.home()} passHref>
        <Button variant="primary" as="a">
          Ok
        </Button>
      </Link>
    </Stack>
  )
}
