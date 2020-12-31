import Link from "next/link"
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
    <nav>
      <Link href="/">Home</Link>

      <Separator />

      <SuperUserOnly>
        <>
          <Link href="/admin">Admin</Link>
          <Separator />
        </>
      </SuperUserOnly>

      <span>{me.email}</span>

      <Separator />

      <button onClick={signout}>Sign out</button>
    </nav>
  )
}

function Separator() {
  return <span>{" | "}</span>
}
