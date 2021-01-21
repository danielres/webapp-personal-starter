import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "./isPassword"
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from "./isName"

export const messages: { [key: string]: string } = {
  Email: `should be a valid email`,
  Password: `should be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`,
  Name: `should be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`,
  ProjectName: `should be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`,
}
