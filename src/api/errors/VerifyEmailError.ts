import SafeError from "./SafeError"

type VerifyEmailErrorArgs = {
  message?: string
  report?: boolean
}

export class VerifyEmailError extends SafeError {
  report: boolean

  constructor({ message, report = false }: VerifyEmailErrorArgs = {}) {
    super()
    this.message =
      message ?? "Email verification failed. Please try again later."
    this.report = report
  }
}
