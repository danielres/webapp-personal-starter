import { User } from "@prisma/client"
import mjml2html from "mjml"
import * as config from "../../../../config"
import { getPath } from "../../../getPath"
import { Button } from "../components/Button"
import { Layout } from "../components/Layout"
import { Section } from "../components/Section"
import { Title } from "../components/Title"
import { sendEmail } from "../sendEmail"
import { getEmailInvitationSecret } from "./getEmailInvitationSecret"

type GetMessageArgs = {
  by: string
  secretLink: string
}

// For syntax highlighting, please use the VScode extension "tobermory.es6-string-html"
const getMessage = ({ by, secretLink }: GetMessageArgs) =>
  Layout(/* html */ `
    ${Title(`Welcome to ${config.app.name}!`)}

    ${Section(/* html */ `  
      <p>
        You have been invited by ${by} to join ${config.app.name}. 
      </p> 
      <p>
        Please follow this link to continue: 
      </p> 
    `)}

    ${Button(`Create my account`, secretLink)}
  `)

type SendEmailInvitationArgs = {
  invitedBy: User
  email: string
  isSuperUser: boolean
  origin: string
}

export const sendEmailInvitation = async (params: SendEmailInvitationArgs) => {
  const { invitedBy, email, isSuperUser, origin } = params
  const subject = `Welcome to ${config.app.name}!`

  const invitedById = invitedBy.id
  const secret = getEmailInvitationSecret({ email, isSuperUser, invitedById })
  const path = getPath.signup.withInvitation(secret)
  const secretLink = `${origin}${path}`

  const invitedByName = invitedBy.name
  const { html } = mjml2html(getMessage({ by: invitedByName, secretLink }))

  return sendEmail({ to: email, subject, html })
}
