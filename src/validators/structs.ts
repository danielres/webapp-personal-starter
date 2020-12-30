import { define, object } from "superstruct"
import { isPassword } from "./isPassword"
import { isEmail } from "./isEmail"

export { assert, is, validate } from "superstruct"

export const Email = define("Email", isEmail)

export const Password = define("Password", isPassword)

export const SigninInput = object({
  email: Email,
  password: Password,
})
