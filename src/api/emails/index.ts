import type {
  SignupOnFailureArgs,
  SignupOnSuccessArgs,
} from "../schema/resolvers/mutations/signup"
import { sendEmail } from "./sendEmail"

export const signup = {
  failure: async ({ email, reason }: SignupOnFailureArgs) => {
    if (reason === "EMAIL_EXISTS")
      sendEmail({
        to: email,
        subject: `Signup failed`,
        body: `Signup failed because your email already exists in our db.`,
      })
  },

  success: async ({ email, name }: SignupOnSuccessArgs) => {
    sendEmail({
      to: email,
      subject: `Welcome ${name}`,
      body: `Welcome ${name}!`,
    })
  },
}
