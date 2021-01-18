import { getPath } from "../../../getPath"
import * as object from "../../utils/object"

export const getEmailInvitationLink = (
  email: string,
  isSuperUser: boolean,
  origin: string,
  invitedById: number
) => {
  const secret = object.encrypt({ email, isSuperUser, invitedById })
  const path = getPath.signup.withInvitation(secret)

  return `${origin}${path}`
}
