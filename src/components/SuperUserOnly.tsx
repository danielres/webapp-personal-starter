import React from "react"
import { sdk } from "../../sdk"

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

  if (!data?.me?.isSuperUser) return <>Access forbidden</>

  if (!data?.me) return <>Loading...</>

  return <>{children}</>
}
