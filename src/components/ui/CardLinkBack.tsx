import Link from "next/link"
import React, { Fragment } from "react"
import * as config from "../../../config"
import { Arrow } from "../Icons/Arrow"
import { InlineIcon } from "../Icons/InlineIcon"
import { Button } from "./Button"

type CardLinkBackProps = {
  href?: string
  onClick?: () => void
}

export function CardLinkBack({ href, onClick }: CardLinkBackProps) {
  if (config.isDev && !onClick && !href)
    throw new Error(`Must provide either "onClick" or "href"`)

  return (
    <div className="-mt-2 -ml-3">
      <MaybeLink href={href}>
        <Button
          as={href ? "a" : "button"}
          onClick={onClick}
          padding="none"
          variant="text"
        >
          <InlineIcon>
            <Arrow direction="left" />
          </InlineIcon>

          <span className="ml-2">back</span>
        </Button>
      </MaybeLink>
    </div>
  )
}

type MaybeLinkProps = {
  children: React.ReactNode
  href?: string
}

function MaybeLink({ children, href }: MaybeLinkProps) {
  if (href)
    return (
      <Link href={href} passHref>
        {children}
      </Link>
    )

  return <Fragment>{children}</Fragment>
}
