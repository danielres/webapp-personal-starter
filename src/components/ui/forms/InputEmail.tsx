import React from "react"
import { useFormContext } from "react-hook-form"
import { Email, messages, is } from "../../../validators"

export function InputEmail() {
  const { register, errors } = useFormContext()

  return (
    <>
      <input
        name="email"
        ref={register({
          validate: (value) => is(value, Email) || messages.Email,
        })}
        placeholder="email"
      />
      {errors?.email && <div>{errors.email.message}</div>}
    </>
  )
}
