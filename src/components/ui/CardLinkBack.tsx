import Link from "next/link"
import React from "react"
import { Arrow } from "../Icons/Arrow"
import { InlineIcon } from "../Icons/InlineIcon"
import { Button } from "./Button"

export function CardLinkBack({ href }: { href: string }) {
  return (
    <div className="-mt-2 -ml-3">
      <Link href={href} passHref>
        <Button as="a" variant="text" padding="none">
          <InlineIcon>
            <Arrow direction="left" />
          </InlineIcon>
          <span className="ml-2">back</span>
        </Button>
      </Link>
    </div>
  )
}
