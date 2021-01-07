import Link from "next/link"
import React from "react"
import { Button } from "src/components/ui/Button"
import { Stack } from "src/components/ui/Stack"
import { H1 } from "../ui/H1"

export function FormSignupSuccess() {
  return (
    <Stack className="text-center">
      <H1 className="text-gray-600">Thank you for registering!</H1>

      <p className="text-gray-700">
        Please check your mailbox for further instructions.
      </p>

      <Link href="/">
        <Button variant="primary" as="a">
          Ok
        </Button>
      </Link>
    </Stack>
  )
}
