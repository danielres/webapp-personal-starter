import SafeError from "./SafeError"

export class UnknownServerError extends SafeError {
  constructor({ message = "Unknown Server error" } = {}) {
    super()
    this.message = message
  }
}
