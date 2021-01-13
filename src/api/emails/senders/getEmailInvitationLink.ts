import { getPath } from "../../../getPath"
import * as object from "../../utils/object"

export const getEmailInvitationLink = (
  email: string,
  isSuperUser: boolean,
  origin: string
) => {
  const secret = object.encrypt({ email, isSuperUser })
  const path = getPath.signup.withInvitation(secret)

  return `${origin}${path}`
}
