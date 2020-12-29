import SafeError from "./SafeError"

export class ForbiddenError extends SafeError {
  report: boolean

  constructor({ message = "Not authorized" } = {}) {
    super()
    this.message = message
    this.report = false
  }
}
