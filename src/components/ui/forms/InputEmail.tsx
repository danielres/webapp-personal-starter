import React from "react"
import { useFormContext } from "react-hook-form"
import { isEmail } from "../../../validators/isEmail"
import { messages } from "../../../validators/messages"
import ui from "../ui.module.css"

export function InputEmail() {
  const { register, errors } = useFormContext()

  return (
    <>
      <input
        className={ui.InputText}
        name="email"
        ref={register({ validate: (v) => isEmail(v) || messages.Email })}
        placeholder="email"
        type="text"
      />
      {errors?.email && <div>{errors.email.message}</div>}
    </>
  )
}
