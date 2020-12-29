import { GraphQLError } from "graphql"
import { UnknownServerError } from "./errors/UnknownServerError"
import { reportError } from "./errors/reportError"

export const formatError = (
  error: GraphQLError
): GraphQLError | UnknownServerError => {
  // special case for graphql-shield errors:
  if (error.message === "Not Authorised!") return error

  // other cases:
  const report = error.extensions?.exception?.report ?? true
  const isSafeError = error.extensions?.exception?.isSafeError ?? false

  if (report) reportError(error)
  return isSafeError ? error : new UnknownServerError()
}
