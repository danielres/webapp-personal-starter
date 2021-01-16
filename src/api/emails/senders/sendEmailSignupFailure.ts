import mjml2html from "mjml"
import * as config from "../../../../config"
import { getPath } from "../../../getPath"
import { Button } from "../components/Button"
import { Layout } from "../components/Layout"
import { Section } from "../components/Section"
import { Title } from "../components/Title"
import { sendEmail } from "../sendEmail"

type GetMessageArgs = {
  beginResetPasswordLink: string
  signInLink: string
}

// For syntax highlighting, please use the VScode extension "tobermory.es6-string-html"
const getMessageEmailExists = ({
  beginResetPasswordLink,
  signInLink,
}: GetMessageArgs) =>
  Layout(/* html */ `
    ${Title(`Account creation failed`)}

    ${Section(/* html */ `  
      <p>
        Your email is already associated with an account.
      </p> 
      <p>
        Please sign in using your existing email + password.
      </p> 

    `)}

    ${Button(`Sign in`, `${signInLink}`)}
    
    ${Section(/* html */ `  
      <p>
        Forgot your password?
      </p> 
    `)}
    
    ${Button(`Reset my password`, beginResetPasswordLink)}

  `)

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
    const beginResetPasswordLink = `${origin}${getPath.password.reset.begin()}`
    const signInLink = `${origin}${getPath.signin()}`

    const { html } = mjml2html(
      getMessageEmailExists({ beginResetPasswordLink, signInLink })
    )

    sendEmail({ to: email, subject, html })
  }
}
