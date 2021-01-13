import { sendEmailInvitation } from "./senders/sendEmailInvitation"
import { sendEmailSignupFailure } from "./senders/sendEmailSignupFailure"
import { sendEmailVerification } from "./senders/sendEmailVerification"

export const inviteByEmail = {
  success: sendEmailInvitation,
}

export const resendVerificationEmail = {
  success: sendEmailVerification,
}

export const signup = {
  failure: sendEmailSignupFailure,
  success: sendEmailVerification,
}
