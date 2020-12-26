import bcrypt from "bcrypt"
import * as config from "../../../../../config"
import { Context } from "../../../context"
import * as errors from "../../../errors/errors"
import { reportError } from "../../../errors/reportError"
import { sendEmail } from "./sendEmail"

type SignupArgs = { email: string; name: string; password: string }

// Always returns true to avoid leaking info about account existence
export const signup = async (
  _: unused,
  args: SignupArgs,
  { prisma }: Context
): Promise<true> => {
  const { password, ...rest } = args
  const { email, name } = rest

  try {
    const usersCount = await prisma.user.count()
    const isSuperUser = usersCount === 0
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounts)
    await prisma.user.create({
      data: {
        ...rest,
        isSuperUser,
        password: hashedPassword,
      },
    })
  } catch (error) {
    const accountAlreadyExists =
      error.code === errors.codes.prisma.UNIQUE_VALIDATION_FAILURE

    if (accountAlreadyExists) {
      await sendEmail("AFTER_SIGNUP_INSTRUCTIONS", { email, name })
      return true
    }

    reportError(error)
    throw errors.ServerError("8fba2535")
  }

  await sendEmail("AFTER_SIGNUP_INSTRUCTIONS", { email, name })

  return true
}
