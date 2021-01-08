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
const sendEmailSignupFailure = async ({
  email,
  reason,
  origin,
}: SendEmailSignupFailureArgs) => {
  if (reason === "EMAIL_EXISTS")
    sendEmail({
      to: email,
      subject: `Signup failed`,
      body: `
Signup failed because your email already exists in our db. 
Please follow this link to verify your email: 
${getEmailVerificationLink(email, origin)}`,
    })
}

type SendEmailVerificationArgs = {
  email: string
  name: string
  origin: string
}
const sendEmailVerification = async ({
  email,
  name,
  origin,
}: SendEmailVerificationArgs) => {
  sendEmail({
    to: email,
    subject: `Welcome ${name}`,
    body: `
Welcome ${name}! 
Please follow this link to verify your email: 
${getEmailVerificationLink(email, origin)}`,
  })
}

export const resendVerificationEmail = {
  success: sendEmailVerification,
}

export const signup = {
  failure: sendEmailSignupFailure,
  success: sendEmailVerification,
}
