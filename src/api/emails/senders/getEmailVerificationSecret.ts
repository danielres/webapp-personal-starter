import * as object from "../../utils/object"

type EmailVerificationSecretData = {
  email: string
}

export const getEmailVerificationSecret = (args: EmailVerificationSecretData) =>
  object.encrypt(args)
