import React from "react"
import { useFormContext } from "react-hook-form"
import { messages } from "../../../validators/messages"
import { isEmail } from "../../../validators/isEmail"

export function InputEmail() {
  const { register, errors } = useFormContext()

  return (
    <>
      <input
        name="email"
        ref={register({ validate: (v) => isEmail(v) || messages.Email })}
        placeholder="email"
        type="text"
      />
      {errors?.email && <div>{errors.email.message}</div>}
    </>
  )
}
