import { ResetPasswordBeginMutationVariables } from "../../../../generated/operations"
import {
  ResetPasswordBeginInput,
  validate,
} from "../../../../validators/structs"
import { Context } from "../../../context"
import * as emails from "../../../emails"
import { ValidationErrors } from "../../../errors/InputValidationError"

// Exported so they can be mocked in tests:
// export const onFailure = emails.signup.failure
export const onSuccess = emails.resetPasswordEmail.begin

// Always returns true to avoid leaking info about account existence,
// any account info is only sent by email:
export const resetPasswordBegin = async (
  _: unused,
  args: ResetPasswordBeginMutationVariables,
  { req }: Context
): Promise<true | ValidationErrors | Error> => {
  const [error] = validate(args, ResetPasswordBeginInput)
  if (error) return new ValidationErrors(error.failures())

  try {
    const { email, password } = args
    const origin = req.headers.origin as string

    await onSuccess({ email, password, origin })

    return true
  } catch (error) {
    return error
  }
}
