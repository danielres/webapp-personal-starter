import { sendEmailInvitation } from "./senders/sendEmailInvitation"
import { sendEmailResetPasswordBegin } from "./senders/sendEmailResetPasswordBegin"
import { sendEmailSignupFailure } from "./senders/sendEmailSignupFailure"
import { sendEmailVerification } from "./senders/sendEmailVerification"

export const inviteByEmail = {
  success: sendEmailInvitation,
}

export const resendVerificationEmail = {
  success: sendEmailVerification,
}

export const resetPasswordEmail = {
  begin: sendEmailResetPasswordBegin,
}

export const signup = {
  failure: sendEmailSignupFailure,
  success: sendEmailVerification,
}
