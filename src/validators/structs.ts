import { define, number, object, optional } from "superstruct"
import { isEmail } from "./isEmail"
import { isName } from "./isName"
import { isPassword } from "./isPassword"
import { messages } from "./messages"

export { assert, create, is, validate } from "superstruct"

export const Password = define("Password", (value) => {
  if (isPassword(value)) return true
  return messages.Password
})

export const Name = define("Name", (value) => {
  if (isName(value)) return true
  return messages.Name
})

export const Email = define("Email", (value) => {
  if (isEmail(value)) return true
  return messages.Email
})

export const SigninInput = object({
  email: Email,
  password: Password,
})

export const UpdateUserInput = object({
  id: number(),
  email: optional(Email),
  name: optional(Name),
})
