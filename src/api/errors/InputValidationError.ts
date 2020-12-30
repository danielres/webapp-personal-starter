import { Failure } from "superstruct"
import SafeError from "./SafeError"
import { messages } from "../../validators/messages"

export class ValidationErrors extends SafeError {
  report: boolean
  value: unknown
  messages: string[]

  constructor(failures: Failure[]) {
    super()

    this.message = "Validation errors occured"

    // error.messages contains user-friendly error messages
    // with details about each validation failure:
    this.messages = failures.map(
      ({ key, type }) => `${key}: ${messages[type] ?? "unknown error"}`
    )

    // Report the error only if any of the failures
    // misses a user-friendly error message:
    this.report = failures
      .map(({ type }) => type in messages)
      .some((result) => result === false)
  }
}
