import mjml2html from "mjml"
import * as config from "../../../../config"
import { getPath } from "../../../getPath"
import { Button } from "../components/Button"
import { Layout } from "../components/Layout"
import { Section } from "../components/Section"
import { Title } from "../components/Title"
import { sendEmail } from "../sendEmail"
import { getEmailVerificationSecret } from "./getEmailVerificationSecret"
type GetMessageArgs = {
  name: string
  secretLink: string
}

// For syntax highlighting, please use the VScode extension "tobermory.es6-string-html"
const getMessage = ({ name, secretLink }: GetMessageArgs) =>
  Layout(/* html */ `
    ${Title(`Welcome ${name} to ${config.app.name}!`)}

    ${Section(/* html */ `  
      <p>
        Please follow this link to verify your email: 
      </p> 
    `)}

    ${Button(`Verify my email`, secretLink)}
  `)

type SendEmailVerificationArgs = {
  email: string
  name: string
  origin: string
}

export const sendEmailVerification = async (
  params: SendEmailVerificationArgs
) => {
  const { email, name, origin } = params

  const secret = getEmailVerificationSecret({ email })
  const path = getPath.signup.verifyEmail(secret)
  const secretLink = `${origin}${path}`

  const subject = `Welcome ${name} to ${config.app.name}`
  const { html } = mjml2html(getMessage({ name, secretLink }))

  sendEmail({ to: email, subject, html })
}
