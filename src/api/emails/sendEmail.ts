import nodemailer from "nodemailer"
import type Mail from "nodemailer/lib/mailer"
import * as config from "../../../config"

const { from, provider } = config.email

export const sendEmail = (receivedOptions: Mail.Options) => {
  const options = { from, ...receivedOptions }

  if (provider === "console") {
    console.log("[sendEmail]", options)
    return
  }

  if (provider === "noop") {
    return
  }

  if (provider === "mailtrap") {
    const transport = nodemailer.createTransport(
      config.email.providers.mailtrap
    )

    return new Promise((resolve, reject) =>
      transport.sendMail(options, (error, info) =>
        error ? reject(error) : resolve(info)
      )
    )
  }
}
