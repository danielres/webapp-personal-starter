import * as config from "../../../../../config"
import { ResetPasswordFinishMutationVariables } from "../../../../generated/operations"
import * as password from "../../../../utils/password"
import {
  ResetPasswordFinishInput,
  validate,
} from "../../../../validators/structs"
import { Context } from "../../../context"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { ResetPasswordSecretExpiredError } from "../../../errors/ResetPasswordSecretExpiredError"
import * as object from "../../../utils/object"

// Exported so they can be mocked in tests:
export const onSuccess = () => {}

// Always returns true to avoid leaking info about account existence,
// any account info is only sent by email:
export const resetPasswordFinish = async (
  _: unused,
  args: ResetPasswordFinishMutationVariables,
  { prisma }: Context
): Promise<
  true | ValidationErrors | ResetPasswordSecretExpiredError | Error
> => {
  const [error] = validate(args, ResetPasswordFinishInput)
  if (error) return new ValidationErrors(error.failures())

  try {
    const { secret } = args
    const ttl = config.auth.password.reset.ttl
    const now = Date.now()

    const decrypted = object.decrypt(secret)
    const { email, password: pw, timestamp } = decrypted

    const isSecretExpired = now - timestamp > ttl
    if (isSecretExpired) return new ResetPasswordSecretExpiredError()

    const hashedPassword = await password.hash(pw)

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    await onSuccess()

    return true
  } catch (error) {
    return error
  }
}
