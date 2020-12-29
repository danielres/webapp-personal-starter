import { define } from "superstruct"
export { is } from "superstruct"

const PASSWORD_MIN_LENGTH = 8

const isEmail = (input: any) => {
  return typeof input === "string" && /.+\@.+\..+/.test(input)
}
const isPassword = (input: any) => {
  return typeof input === "string" && input.length >= PASSWORD_MIN_LENGTH
}

export const Email = define("Email", isEmail)
export const Password = define("Password", isPassword)

export const messages = {
  Email: `Should be a valid email`,
  Password: `Should be at least ${PASSWORD_MIN_LENGTH} characters`,
}
