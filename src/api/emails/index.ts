import * as config from "../../../config"
import { getPath } from "../../getPath"
import * as object from "../utils/object"
import { sendEmail } from "./sendEmail"

const getEmailInvitationLink = (
  email: string,
  isSuperUser: boolean,
  origin: string
) => {
  const secret = object.encrypt({ email, isSuperUser })
  const path = getPath.signup.withInvitation(secret)
  return `${origin}${path}`
}

const getEmailVerificationLink = (email: string, origin: string) => {
  const secret = object.encrypt({ email })
  const path = getPath.signup.verifyEmail(secret)
  return `${origin}${path}`
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

type SendEmailInvitationArgs = {
  by: string
  email: string
  isSuperUser: boolean
  origin: string
}
const sendEmailInvitation = async ({
  by,
  email,
  isSuperUser,
  origin,
}: SendEmailInvitationArgs) => {
  sendEmail({
    to: email,
    subject: `Welcome`,
    body: `
You have been invited by ${by} to join ${config.app.name}! 
Please follow this link to continue: 
${getEmailInvitationLink(email, isSuperUser, origin)}`,
  })
}

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
