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

    this.messages = failures.map(
      ({ key, message }) => `${key}: ${message ?? "unknown error"}`
    )

    this.report = false
  }
}
