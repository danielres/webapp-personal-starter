import React from "react"
import { sdk } from "../sdk"

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
      Menu: <span>{me.email}</span>
      <button onClick={signout}>Sign out</button>
    </nav>
  )
}
