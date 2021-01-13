import * as config from "../../../../config"
import { sendEmail } from "../sendEmail"
import { getEmailVerificationLink } from "./getEmailVerificationLink"

type SendEmailSignupFailureArgs = {
  email: string
  reason: "EMAIL_EXISTS"
  origin: string
}

export const sendEmailSignupFailure = async (
  params: SendEmailSignupFailureArgs
) => {
  const { email, reason, origin } = params

  if (reason === "EMAIL_EXISTS") {
    const subject = `${config.app.name}: Signup failed`
    const secretLink = getEmailVerificationLink(email, origin)

    const html = `
      <p>
        Signup failed because your email already exists in our db.
      </p> 
      <p>
        Please follow this link to verify your email: 
      </p>
      <p>
        <b><a href="${secretLink}">Verify my email</a></b>
      </p>
    `

    sendEmail({ to: email, subject, html })
  }
}
