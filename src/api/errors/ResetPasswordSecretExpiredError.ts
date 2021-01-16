import SafeError from "./SafeError"

export class ResetPasswordSecretExpiredError extends SafeError {
  report: boolean

  constructor() {
    super()
    this.message = "The link has expired."
    this.report = false
  }
}
