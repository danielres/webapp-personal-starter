import nodemailer from "nodemailer"
import type Mail from "nodemailer/lib/mailer"
import * as config from "../../../config"
import { SendEmailError } from "../errors/SendEmailError"

const { from, provider } = config.email

export const sendEmail = async (receivedOptions: Mail.Options) => {
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

    const {
      accepted,
      messageId,
      rejected,
    } = await new Promise((resolve, reject) =>
      transport.sendMail(options, (error, info) =>
        error ? reject(error) : resolve(info)
      )
    )

    if (accepted.length > 0) return
    throw new SendEmailError({ messageId, rejected })
  }
}
