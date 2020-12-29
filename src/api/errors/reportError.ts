import * as Sentry from "@sentry/node"
import { GraphQLError } from "graphql"
import * as config from "../../../config"

export const reportError = (error: GraphQLError) => {
  reportErrorWithConsole(error)
  if (config.sentry.isEnabled) reportErrorWithSentry(error)
}

function reportErrorWithConsole(error: GraphQLError) {
  console.error("\n")
  console.error("== SERVER ERROR ".padEnd(70, "="))
  console.error(new Date().toUTCString())
  console.error("\n")
  console.error(JSON.stringify(error, null, 2))
  console.error("== /SERVER ERROR ".padEnd(70, "="))
  console.error("\n")
}

function reportErrorWithSentry(error: GraphQLError) {
  Sentry.init({
    dsn: config.sentry.dsn,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  })

  Sentry.withScope((scope) => {
    Sentry.captureException(error)
    console.log("ERROR REPORTED TO SENTRY")
  })
}
