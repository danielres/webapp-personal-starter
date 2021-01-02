import * as config from "../../../config"

const { from, provider } = config.emails

type SendEmailArgs = {
  to: string
  subject: string
  body: string
}

export const sendEmail = ({ to, subject, body }: SendEmailArgs) => {
  if (provider === "console") {
    console.log("[sendEmail]", { from, to, subject, body })
  }
}
