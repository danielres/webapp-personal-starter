import { Context } from "../../../context"
import * as emails from "../../../emails"
import { ServerError } from "../../../errors/ServerError"

// Exported so it can be mocked in tests:
export const onSuccess = emails.resendVerificationEmail.success

export const resendVerificationEmail = async (
  _: unused,
  __: unused,
  { req, me }: Context
): Promise<true | Error> => {
  if (!me)
    return new ServerError({
      message: "User not found. Please try again later",
      report: false,
    })

  const { email, name } = me
  const origin = req.headers.origin as string
  await onSuccess({ email, name, origin })
  return true
}
