import React from "react"

type H2Props = {
  children: React.ReactNode
}
export function H2({ children }: H2Props) {
  return <h2 className="mb-4 text-xl">{children}</h2>
}
