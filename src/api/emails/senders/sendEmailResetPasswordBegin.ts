import mjml2html from "mjml"
import * as config from "../../../../config"
import { Button } from "../components/Button"
import { Layout } from "../components/Layout"
import { Section } from "../components/Section"
import { Title } from "../components/Title"
import { sendEmail } from "../sendEmail"

import { getPath } from "../../../getPath"
import * as object from "../../utils/object"

export const getEmailPasswordResetConfirmationLink = (
  email: string,
  password: string,
  origin: string
) => {
  const timestamp = Date.now()
  const secret = object.encrypt({ email, password, timestamp })
  const path = getPath.password.reset.finish(secret)
  return `${origin}${path}`
}

type GetMessageArgs = {
  secretLink: string
  ttlInMinutes: number
}

// For syntax highlighting, please use the VScode extension "tobermory.es6-string-html"
export const getMessage = ({ secretLink, ttlInMinutes }: GetMessageArgs) =>
  Layout(/* html */ `
    ${Title(`Password reset confirmation`)}

    ${Section(/* html */ `  
      <p>
        Please follow this link to proceed with your password reset: 
      </p> 
    `)}

    ${Button(`Update my password`, secretLink)}

    ${Section(/* html */ `  
      <p>
        Please note: <b>this link will expire in ${ttlInMinutes} minutes.</b>
      </p> 
    `)}

    ${Section(/* html */ `  
      <p>
        If you haven't requested password reset, it is safe to ignore this message.
      </p> 
    `)}
  `)

type sendEmailResetPasswordBeginArgs = {
  email: string
  password: string
  origin: string
}

export const sendEmailResetPasswordBegin = async (
  params: sendEmailResetPasswordBeginArgs
) => {
  const { email, password, origin } = params
  const subject = `${config.app.name}: Password reset confirmation`

  const timestamp = Date.now()
  const ttlInMinutes = Math.floor(config.auth.password.reset.ttl / (1000 * 60))
  const secret = object.encrypt({ email, password, timestamp })
  const path = getPath.password.reset.finish(secret)
  const secretLink = `${origin}${path}`

  const { html } = mjml2html(getMessage({ secretLink, ttlInMinutes }))

  sendEmail({ to: email, subject, html })
}
