import SafeError from "./SafeError"

type ServerErrorArgs = {
  id?: string
  message: string
  report: boolean
}

export class ServerError extends SafeError {
  report: boolean

  constructor({
    id,
    message = "Server error",
    report = true,
  }: ServerErrorArgs) {
    super()
    this.message = id ? `${message} #${id}` : message
    this.report = report
  }
}
