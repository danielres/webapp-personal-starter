import SafeError from "./SafeError"

export class NotAuthenticatedError extends SafeError {
  report: boolean

  constructor() {
    super()
    this.message = "You are not authenticated, please sign in to continue."
    this.report = false
  }
}
