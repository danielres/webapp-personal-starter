import React from "react"
import { useFormContext } from "react-hook-form"
import { Password, messages, is } from "../../../validators"

export function InputPassword() {
  const { register, errors } = useFormContext()

  return (
    <>
      <input
        name="password"
        placeholder="password"
        ref={register({
          validate: (value) => is(value, Password) || messages.Password,
        })}
        type="password"
      />
      {errors?.password && <div>{errors.password.message}</div>}
    </>
  )
}
