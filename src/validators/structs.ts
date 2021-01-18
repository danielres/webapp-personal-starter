import {
  boolean,
  define,
  nullable,
  number,
  object,
  optional,
  string,
} from "superstruct"
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

export const InviteByEmailInput = object({
  email: Email,
  isSuperUser: optional(boolean()),
})

export const ResetPasswordBeginInput = object({
  email: Email,
  password: Password,
})

export const ResetPasswordFinishInput = object({
  secret: string(),
})

export const SigninInput = object({
  email: Email,
  password: Password,
})

export const SignupInput = object({
  email: Email,
  name: Name,
  password: Password,
})

export const SignupWithInvitationInput = object({
  name: Name,
  password: Password,
  secret: string(),
})

export const UpdateUserInput = object({
  id: number(),
  email: optional(Email),
  name: optional(Name),
  isSuperUser: optional(boolean()),
  approvedById: optional(nullable(number())),
})
