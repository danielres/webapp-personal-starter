import bcrypt from "bcrypt"
import * as config from "../../../../../config"
import { SignupMutationVariables } from "../../../../generated/operations"
import { Context } from "../../../context"
import * as emails from "../../../emails"
import * as codes from "../../../errors/codes"
import { ServerError } from "../../../errors/ServerError"
import { SignupInput, validate } from "../../../../validators/structs"
import { ValidationErrors } from "../../../errors/InputValidationError"

export type SignupOnFailureArgs = {
  email: string
  reason: "EMAIL_EXISTS"
  origin: string
}
export const onFailure = async ({
  email,
  reason,
  origin,
}: SignupOnFailureArgs) => {
  await emails.signup.failure({ email, reason, origin })
}

export type SignupOnSuccessArgs = {
  email: string
  name: string
  origin: string
}
export const onSuccess = async ({
  email,
  name,
  origin,
}: SignupOnSuccessArgs) => {
  await emails.signup.success({ email, name, origin })
}

// Always returns true to avoid leaking info about account existence,
// any info is only sent by email:
export const signup = async (
  _: unused,
  args: SignupMutationVariables,
  { prisma, req }: Context
): Promise<true | ValidationErrors> => {
  const [error] = validate(args, SignupInput)
  if (error) return new ValidationErrors(error.failures())

  const origin = req.headers.origin as string

  const { password, ...rest } = args
  const { email, name } = rest

  try {
    const usersCount = await prisma.user.count()
    const isSuperUser = usersCount === 0
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounts)

    const data = { ...rest, isSuperUser, password: hashedPassword }
    await prisma.user.create({ data })
    await onSuccess({ email, name, origin })
  } catch (error) {
    const emailExists =
      error.code === codes.prisma.UNIQUE_VALIDATION_FAILURE &&
      error.meta?.target?.includes("email")

    if (emailExists) {
      await onFailure({ email, reason: "EMAIL_EXISTS", origin })
      return true
    }

    // Unknown error (gets reported)
    throw new ServerError({
      message: "Could not signup, please try again later.",
      report: true,
    })
  }

  return true
}
