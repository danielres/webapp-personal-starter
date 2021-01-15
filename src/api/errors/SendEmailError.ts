import SafeError from "./SafeError"

export class SendEmailError extends SafeError {
  report: boolean
  infos: Object

  constructor(details: Object) {
    super()
    this.message = "Could not send email, please try again later"
    this.infos = details
    this.report = true
  }
}
