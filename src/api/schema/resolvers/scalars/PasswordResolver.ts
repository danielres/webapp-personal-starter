// REMOVE ME

import { GraphQLScalarType } from "graphql"

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 64

const ensureValidPassword = (value: unknown) => {
  if (typeof value !== "string")
    throw new TypeError(`Value is not string: ${value}`)

  if (value.length < PASSWORD_MIN_LENGTH)
    throw new TypeError(
      `Password should be at least ${PASSWORD_MIN_LENGTH} characters.`
    )

  if (value.length > PASSWORD_MAX_LENGTH)
    throw new TypeError(
      `Password should be max ${PASSWORD_MAX_LENGTH} characters.`
    )

  return value
}

export const PasswordResolver = new GraphQLScalarType({
  name: "Password",
  description: "A field whose value is a secure password.",
  parseValue: (value) => {
    ensureValidPassword(value)
    return value
  },
})
