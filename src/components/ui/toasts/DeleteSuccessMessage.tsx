import React from "react"
import { Check } from "../../Icons/Check"
import { InlineIcon } from "../../Icons/InlineIcon"

export function DeleteSuccessMessage({ name }: DeleteSuccessMessageProps) {
  return (
    <>
      <span className="text-green-800">
        <InlineIcon>
          <Check />
        </InlineIcon>
      </span>{" "}
      <span className="text-gray-500">
        <b>{name}</b> was deleted
      </span>
    </>
  )
}
type DeleteSuccessMessageProps = {
  name: string
}
