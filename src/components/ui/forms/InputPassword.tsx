import React from "react"
import { useFormContext } from "react-hook-form"
import { isPassword } from "../../../validators/isPassword"
import { messages } from "../../../validators/messages"

export function InputPassword() {
  const { register, errors } = useFormContext()

  return (
    <>
      <input
        name="password"
        placeholder="password"
        ref={register({ validate: (v) => isPassword(v) || messages.Password })}
        type="password"
      />
      {errors?.password && <div>{errors.password.message}</div>}
    </>
  )
}
