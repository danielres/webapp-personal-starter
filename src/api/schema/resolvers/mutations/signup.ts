import bcrypt from "bcrypt"
import * as config from "../../../../../config"
import { SignupMutationVariables } from "../../../../generated/operations"
import { Context } from "../../../context"
import * as emails from "../../../emails"
import * as codes from "../../../errors/codes"
import { ServerError } from "../../../errors/ServerError"

export type SignupOnFailureArgs = { email: string; reason: "EMAIL_EXISTS" }
export const onFailure = async ({ email, reason }: SignupOnFailureArgs) => {
  await emails.signup.failure({ email, reason })
}

export type SignupOnSuccessArgs = { email: string; name: string }
export const onSuccess = async ({ email, name }: SignupOnSuccessArgs) => {
  await emails.signup.success({ email, name })
}

// Always returns true to avoid leaking info about account existence,
// any info is only sent by email:
export const signup = async (
  _: unused,
  args: SignupMutationVariables,
  { prisma }: Context
): Promise<true> => {
  const { password, ...rest } = args
  const { email, name } = rest

  try {
    const usersCount = await prisma.user.count()
    const isSuperUser = usersCount === 0
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounts)

    const data = { ...rest, isSuperUser, password: hashedPassword }
    await prisma.user.create({ data })
    await onSuccess({ email, name })
  } catch (error) {
    const emailExists =
      error.code === codes.prisma.UNIQUE_VALIDATION_FAILURE &&
      error.meta?.target?.includes("email")

    if (emailExists) {
      await onFailure({ email, reason: "EMAIL_EXISTS" })
      return true
    }

    throw new ServerError({
      message: "Could not signup, please try again later.",
      report: true,
    })
  }

  return true
}
