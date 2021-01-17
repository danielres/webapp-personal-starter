import bcrypt from "bcrypt"
import * as config from "../../../../../config"
import { SignupMutationVariables } from "../../../../generated/operations"
import { SignupInput, validate } from "../../../../validators/structs"
import { Context } from "../../../context"
import * as emails from "../../../emails"
import * as codes from "../../../errors/codes"
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
): Promise<true | ValidationErrors | Error> => {
  const [error] = validate(args, SignupInput)
  if (error) return new ValidationErrors(error.failures())

  const origin = req.headers.origin as string

  const { password, ...rest } = args
  const { email, name } = rest

  try {
    // First user to signup automatically:
    //   1) is promoted to superuser
    //   2) is approved by themselves (every user has to be approved to gain access to the app)
    //   3) has their email marked as verified (also needed to gain access)

    const usersCount = await prisma.user.count()
    const isFirstUser = usersCount === 0

    const isSuperUser = isFirstUser
    const emailVerifiedAt = isFirstUser ? new Date() : null
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounts)

    const data = {
      ...rest,
      emailVerifiedAt,
      isSuperUser,
      password: hashedPassword,
    }

    const { id } = await prisma.user.create({ data })

    if (isFirstUser) {
      await prisma.user.update({
        where: { id },
        data: { approvedBy: { connect: { id } } },
      })
    }

    await onSuccess({ email, name, origin })

    return true
  } catch (error) {
    const emailExists =
      error.code === codes.prisma.UNIQUE_VALIDATION_FAILURE &&
      error.meta?.target?.includes("email")

    if (emailExists) {
      await onFailure({ email, reason: "EMAIL_EXISTS", origin })
      return true
    }

    return error
  }
}
