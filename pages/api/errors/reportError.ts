import { GraphQLError } from "graphql"

export const reportError = (error: GraphQLError) => {
  console.error("\n")
  console.error("== SERVER ERROR ".padEnd(70, "="))
  console.error(new Date().toUTCString())
  console.error("\n")
  console.error(JSON.stringify(error, null, 2))
  console.error("== /SERVER ERROR ".padEnd(70, "="))
  console.error("\n")
}
