import { VerifyEmailMutationVariables } from "../../../../generated/operations"
import type { Context } from "../../../context"
import { VerifyEmailError } from "../../../errors/VerifyEmailError"
import * as crypto from "../../../utils/crypto"

export const verifyEmail = async (
  _: unused,
  args: VerifyEmailMutationVariables,
  { prisma }: Context
) => {
  try {
    const { emailVerificationSecret } = args
    const { email } = crypto.decrypt(emailVerificationSecret)

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return new VerifyEmailError({ message: "Email not found." })

    const isEmailAlreadyVerified = Boolean(user?.emailVerifiedAt)

    // Return an empty response to avoid leaking account details if the url was re-used
    // maliciously (the verification url might be found in logs, browser history,...)
    if (isEmailAlreadyVerified) return {}

    await prisma.user.update({
      where: { email },
      data: { emailVerifiedAt: new Date() },
    })

    // Otherwise, return email to prefill the signin form
    // + name to render a nice welcome message:
    return { email: user.email, name: user.name }
  } catch (error) {
    return new VerifyEmailError()
  }
}
