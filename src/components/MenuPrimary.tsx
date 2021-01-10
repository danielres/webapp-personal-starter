import classnames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { sdk } from "../../sdk"
import { House } from "./Icons/House"
import { InlineIcon } from "./Icons/InlineIcon"
import { SuperUserOnly } from "./SuperUserOnly"
import { Container } from "./ui/Container"

type MenuPrimaryProps = {
  className?: string
}

export default function MenuPrimary({ className }: MenuPrimaryProps) {
  const { data, mutate } = sdk.useMe()

  const signout = async () => {
    await sdk.Signout()
    await mutate({ me: null })
  }

  if (!data?.me) return null

  const { me } = data

  return (
    <div className={classnames("sm:pb-12", className)}>
      <div className="bg-white shadow-md sm:fixed sm:w-full">
        <Container className="flex flex-col justify-between sm:flex-row">
          <nav>
            <ul className="flex list-none">
              <li>
                <Link href="/" passHref>
                  <A title="Home">
                    <InlineIcon size={30}>
                      <House />
                    </InlineIcon>
                  </A>
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <ul className="flex flex-col list-none sm:flex-row">
              <li>
                <Link href="/" passHref>
                  <T>{me.email}</T>
                </Link>
              </li>

              <SuperUserOnly>
                <li>
                  <Link href="/admin" passHref>
                    <A>Admin</A>
                  </Link>
                </li>
              </SuperUserOnly>

              <li>
                <B onClick={signout}>Sign out</B>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
    </div>
  )
}

type TProps = {
  children: React.ReactNode
}

function T({ children }: TProps) {
  return (
    <span className={classnames("inline-block px-3 py-3 text-gray-500")}>
      {children}
    </span>
  )
}

type AProps = {
  children: React.ReactNode
  href?: string
  title?: string
  rest?: any
}

function A({ children, href, title, ...rest }: AProps) {
  const router = useRouter()

  const isActive =
    router.pathname === href ||
    (href !== "/" && href && router.pathname.includes(href))

  return (
    <span className="block text-gray-500 transition-colors sm:inline-block hover:text-gray-900">
      <a
        className={classnames(
          "block px-3 py-1 sm:py-3 border-b-2 border-transparent",
          {
            "sm:border-gray-400 text-gray-900": isActive,
          }
        )}
        href={href}
        title={title}
        {...rest}
      >
        {children}
      </a>
    </span>
  )
}

type BProps = {
  children: React.ReactNode
  onClick: () => void
}

function B({ children, onClick }: BProps) {
  return (
    <button
      className="px-3 py-3 text-gray-500 transition-colors hover:text-gray-900"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
