import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "./isPassword"

export const messages: { [key: string]: string } = {
  Email: `should be a valid email`,
  Password: `should be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`,
}
