import { InviteByEmailMutationVariables } from "../../../../generated/operations"
import { InviteByEmailInput, validate } from "../../../../validators/structs"
import { Context } from "../../../context"
import * as emails from "../../../emails"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { NotAuthenticatedError } from "../../../errors/NotAuthenticatedError"

// Exported so it can be mocked in tests:
export const onSuccess = emails.inviteByEmail.success

export const inviteByEmail = async (
  _: unused,
  args: InviteByEmailMutationVariables,
  { me, req }: Context
): Promise<true | Error> => {
  try {
    if (!me) return new NotAuthenticatedError()

    const [error] = validate(args, InviteByEmailInput)
    if (error) return new ValidationErrors(error.failures())

    const invitedBy = me
    const email = args.email
    const isSuperUser = args.isSuperUser ?? false
    const origin = req.headers.origin as string

    await onSuccess({ email, invitedBy, origin, isSuperUser })

    return true
  } catch (error) {
    return error
  }
}
