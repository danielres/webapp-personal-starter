import { GraphQLError } from "graphql"
import { reportError } from "./errors/reportError"
import { UnknownServerError } from "./errors/UnknownServerError"

//
// This codes guards against api internals accidentally leaking to the frontend through errors.
//
//  1)  An error is always reported, except if its "report"
//      property is explicitly false.
//
//  2)  An unknown error is always reported, but revelaed only as a
//      generic "UnknownServerError" to the frontend.
//
//  3)  An error is never forwarded as-is to the frontend, except if:
//        - "isSafeError" is explicitly true.
//        - it originates from graphql-shield.
//

export const formatError = (
  error: GraphQLError
): GraphQLError | UnknownServerError => {
  if (error.message === "Not Authorised!") return error // graphql-shield error

  const report = error.extensions?.exception?.report ?? true
  const isSafeError = error.extensions?.exception?.isSafeError ?? false

  if (report) reportError(error)
  return isSafeError ? error : new UnknownServerError()
}
