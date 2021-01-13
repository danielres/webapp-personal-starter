import { getPath } from "../../../getPath"
import * as object from "../../utils/object"

export const getEmailVerificationLink = (email: string, origin: string) => {
  const secret = object.encrypt({ email })
  const path = getPath.signup.verifyEmail(secret)
  return `${origin}${path}`
}
