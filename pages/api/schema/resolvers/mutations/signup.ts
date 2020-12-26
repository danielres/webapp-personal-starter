import bcrypt from "bcrypt"
import * as config from "../../../../../config"
import { Context } from "../../../context"
import * as codes from "../../../errors/codes"
import { ServerError } from "../../../errors/ServerError"
import { sendEmail } from "./sendEmail"

type SignupArgs = {
  email: string
  name: string
  password: string
}

// Only returns true to avoid leaking info about account existence,
// any info are only sent by email:
export const signup = async (
  _: unused,
  args: SignupArgs,
  { prisma }: Context
): Promise<true> => {
  const { password, ...rest } = args
  const { email } = rest

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
    const emailExists =
      error.code === codes.prisma.UNIQUE_VALIDATION_FAILURE &&
      error.meta?.target?.includes("email")

    const nameExists =
      error.code === codes.prisma.UNIQUE_VALIDATION_FAILURE &&
      error.meta?.target?.includes("name")

    if (emailExists) {
      await sendEmail("AFTER_SIGNUP_INSTRUCTIONS", { email })
      return true
    }

    if (nameExists) {
      throw new ServerError({
        message: "Please choose a different name.",
        report: false,
      })
    }

    throw new ServerError({
      message: "Could not signup, please try again later.",
      report: true,
    })
  }

  await sendEmail("AFTER_SIGNUP_INSTRUCTIONS", { email })
  return true
}
