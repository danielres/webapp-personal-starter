import bcrypt from "bcrypt"
import * as config from "../../../../../config"
import { SignupWithInvitationMutationVariables } from "../../../../generated/operations"
import {
  SignupWithInvitationInput,
  validate,
} from "../../../../validators/structs"
import { Context } from "../../../context"
import * as codes from "../../../errors/codes"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { ServerError } from "../../../errors/ServerError"
import * as crypto from "../../../utils/crypto"

// Exported so they can be mocked in tests:
export const onFailure = (args: any) => {}
export const onSuccess = (args: any) => {}

// Always returns true to avoid leaking info about account existence,
// any account info is only sent by email:
export const signupWithInvitation = async (
  _: unused,
  args: SignupWithInvitationMutationVariables,
  { prisma, req }: Context
): Promise<true | ValidationErrors | Error> => {
  const [error] = validate(args, SignupWithInvitationInput)
  if (error) return new ValidationErrors(error.failures())

  const origin = req.headers.origin as string

  const { name, password, secret } = args

  const { email, isSuperUser } = crypto.decrypt(secret)
  const emailVerifiedAt = new Date()

  try {
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounts)

    const data = {
      email,
      emailVerifiedAt,
      isSuperUser,
      name,
      password: hashedPassword,
    }
    await prisma.user.create({ data })
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

    return error // forwards to formatError
  }
}
