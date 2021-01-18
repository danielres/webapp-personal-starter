import * as object from "../../utils/object"

type EmailInvitationSecretData = {
  email: string
  isSuperUser: boolean
  invitedById: number
}

export const getEmailInvitationSecret = (data: EmailInvitationSecretData) =>
  object.encrypt(data)
