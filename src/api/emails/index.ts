import * as crypto from "../utils/crypto"
import { sendEmail } from "./sendEmail"

const getEmailVerificationLink = (email: string, origin: string) => {
  const encryptedObject = crypto.encrypt({ email })
  return `${origin}/register/${encryptedObject}`
}

type SendEmailSignupFailureArgs = {
  email: string
  reason: "EMAIL_EXISTS"
  origin: string
}

type SendVerificationEmailArgs = {
  email: string
  name: string
  origin: string
}

const sendVerificationEmail = async ({
  email,
  name,
  origin,
}: SendVerificationEmailArgs) => {
  sendEmail({
    to: email,
    subject: `Welcome ${name}`,
    body: `
Welcome ${name}! 
Please follow this link to verify your email: 
${getEmailVerificationLink(email, origin)}`,
  })
}

export const signup = {
  failure: async ({ email, reason, origin }: SendEmailSignupFailureArgs) => {
    if (reason === "EMAIL_EXISTS")
      sendEmail({
        to: email,
        subject: `Signup failed`,
        body: `
Signup failed because your email already exists in our db. 
Please follow this link to verify your email: 
${getEmailVerificationLink(email, origin)}`,
      })
  },

  success: sendVerificationEmail,
}
