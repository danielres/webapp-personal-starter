import * as config from "../../../../config"
import { sendEmail } from "../sendEmail"
import { getEmailInvitationLink } from "./getEmailInvitationLink"

type SendEmailInvitationArgs = {
  by: string
  email: string
  isSuperUser: boolean
  origin: string
}
export const sendEmailInvitation = async (params: SendEmailInvitationArgs) => {
  const { by, email, isSuperUser, origin } = params

  const subject = `Welcome to ${config.app.name}!`
  const secretLink = getEmailInvitationLink(email, isSuperUser, origin)

  const html = `
  <p>
    You have been invited by ${by} to join ${config.app.name}. 
  </p>
  <p>
    Please follow this link to continue: 
  </p>
  <p>
    <b>
      <a href="${secretLink}">Signup using the invitation</a>
    </b>
  </p>`

  sendEmail({ to: email, subject, html })
}
