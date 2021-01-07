import type {
  SignupOnFailureArgs,
  SignupOnSuccessArgs,
} from "../schema/resolvers/mutations/signup"
import * as crypto from "../utils/crypto"
import { sendEmail } from "./sendEmail"

const getEmailVerificationLink = (email: string, origin: string) => {
  const encryptedObject = crypto.encrypt({ email })
  return `${origin}/register/${encryptedObject}`
}

export const signup = {
  failure: async ({ email, reason, origin }: SignupOnFailureArgs) => {
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
  success: async ({ email, name, origin }: SignupOnSuccessArgs) => {
    sendEmail({
      to: email,
      subject: `Welcome ${name}`,
      body: `
Welcome ${name}! 
Please follow this link to verify your email: 
${getEmailVerificationLink(email, origin)}`,
    })
  },
}
