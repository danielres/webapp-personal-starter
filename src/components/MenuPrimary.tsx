import classnames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { sdk } from "../../sdk"
import { SuperUserOnly } from "./SuperUserOnly"

export default function MenuPrimary() {
  const { data, mutate } = sdk.useMe()

  const signout = async () => {
    await sdk.Signout()
    await mutate({ me: null })
  }

  if (!data?.me) return null

  const { me } = data

  return (
    <>
      <div className="bg-white shadow ">
        <div className="container flex justify-between mx-auto">
          <nav>
            <ul className="flex list-none">
              <li>
                <Link href="/" passHref>
                  <A>Home</A>
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <ul className="flex list-none">
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
        </div>
      </div>
    </>
  )
}

type TProps = {
  children: React.ReactNode
}

function T({ children }: TProps) {
  return (
    <span className={classnames("inline-block px-3 py-2 text-gray-500")}>
      {children}
    </span>
  )
}

type AProps = {
  children: React.ReactNode
  href?: string
  rest?: any
}

function A({ children, href, ...rest }: AProps) {
  const router = useRouter()

  const isActive = router.pathname === href
  return (
    <a
      className={classnames(
        "inline-block px-3 py-2 text-gray-500 hover:text-gray-900  border-b-2 border-transparent",
        { "border-gray-400 text-gray-900": isActive }
      )}
      href={href}
      {...rest}
    >
      {children}
    </a>
  )
}

type BProps = {
  children: React.ReactNode
  onClick: () => void
}

function B({ children, onClick }: BProps) {
  return (
    <button
      className="px-3 py-2 text-gray-500 hover:text-gray-900"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
