import bcrypt from "bcrypt"
import * as config from "../../../../../config"
import { SignupMutationVariables } from "../../../../generated/operations"
import { Context } from "../../../context"
import * as codes from "../../../errors/codes"
import { ServerError } from "../../../errors/ServerError"
import { sendEmail } from "./sendEmail"

// Only returns true to avoid leaking info about account existence,
// any info are only sent by email:
export const signup = async (
  _: unused,
  args: SignupMutationVariables,
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

    if (emailExists) {
      await sendEmail("AFTER_SIGNUP_INSTRUCTIONS", { email })
      return true
    }

    throw new ServerError({
      message: "Could not signup, please try again later.",
      report: true,
    })
  }

  await sendEmail("AFTER_SIGNUP_INSTRUCTIONS", { email })
  return true
}
