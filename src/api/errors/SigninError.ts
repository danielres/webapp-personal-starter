import SafeError from "./SafeError"

export class SigninError extends SafeError {
  report: boolean

  constructor() {
    super()
    this.message = "Could not sign in: invalid credentials"
    this.report = false
  }
}
