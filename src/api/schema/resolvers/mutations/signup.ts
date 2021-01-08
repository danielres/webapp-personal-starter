import bcrypt from "bcrypt"
import * as config from "../../../../../config"
import { SignupMutationVariables } from "../../../../generated/operations"
import { Context } from "../../../context"
import * as emails from "../../../emails"
import * as codes from "../../../errors/codes"
import { ServerError } from "../../../errors/ServerError"
import { SignupInput, validate } from "../../../../validators/structs"
import { ValidationErrors } from "../../../errors/InputValidationError"

// Exported so they can be mocked in tests:
export const onFailure = emails.signup.failure
export const onSuccess = emails.signup.success

// Always returns true to avoid leaking info about account existence,
// any account info is only sent by email:
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
    const emailVerifiedAt = usersCount === 0 ? new Date() : null
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounts)

    const data = {
      ...rest,
      emailVerifiedAt,
      isSuperUser,
      password: hashedPassword,
    }
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
