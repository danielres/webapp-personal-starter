import React from "react"
import * as dateFns from "date-fns"

type TimeProps = {
  time: string
  format?: string
}

export function Time({ format = "yyyy-MM-dd HH:mm", time }: TimeProps) {
  return <>{dateFns.format(new Date(time), format)}</>
}
