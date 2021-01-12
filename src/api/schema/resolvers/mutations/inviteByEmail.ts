import crypto from "crypto"
import { InviteByEmailMutationVariables } from "../../../../generated/operations"
import { InviteByEmailInput, validate } from "../../../../validators/structs"
import { Context } from "../../../context"
import * as emails from "../../../emails"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { ServerError } from "../../../errors/ServerError"

// Exported so it can be mocked in tests:
export const onSuccess = emails.inviteByEmail.success

export const inviteByEmail = async (
  _: unused,
  args: InviteByEmailMutationVariables,
  { me, req }: Context
): Promise<true | Error> => {
  try {
    if (!me?.name)
      return new ServerError({
        message: "Please sign in to continue",
        report: false,
      })

    const [error] = validate(args, InviteByEmailInput)
    if (error) return new ValidationErrors(error.failures())

    const by = me.name
    const email = args.email
    const isSuperUser = args.isSuperUser ?? false
    const origin = req.headers.origin as string

    await onSuccess({ email, by, origin, isSuperUser })

    return true
  } catch (error) {
    return error
  }
}
