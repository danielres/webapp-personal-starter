import * as config from "../../../../config"
import { sendEmail } from "../sendEmail"
import { getEmailVerificationLink } from "./getEmailVerificationLink"

type SendEmailVerificationArgs = {
  email: string
  name: string
  origin: string
}

export const sendEmailVerification = async (
  params: SendEmailVerificationArgs
) => {
  const { email, name, origin } = params

  const subject = `Welcome ${name} to ${config.app.name}`
  const secretLink = getEmailVerificationLink(email, origin)

  const html = `
    <p>
      Welcome ${name}!
    </p> 
    <p>
      Please follow this link to verify your email: 
    </p>
    <p>
      <a href="${secretLink}"><b>Verify my email</b></a>
    </p>
  `

  sendEmail({ to: email, subject, html })
}
