import type { UserUpdateMutationVariables } from "../../../../generated/operations"
import { UserUpdateInput, validate } from "../../../../validators/structs"
import type { Context } from "../../../context"
import * as codes from "../../../errors/codes"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { NotAuthenticatedError } from "../../../errors/NotAuthenticatedError"
import { ServerError } from "../../../errors/ServerError"

export const userUpdate = async (
  _: unused,
  args: UserUpdateMutationVariables,
  { me, prisma }: Context
) => {
  try {
    if (!me) return new NotAuthenticatedError()

    const coerced = {
      id: args.id,
      email: args.email ?? undefined,
      name: args.name ?? undefined,
      isSuperUser: args.isSuperUser ?? undefined,
      approvedById: args.isApproved ? me.id : null,
    }

    const [error] = validate(coerced, UserUpdateInput)
    if (error) return new ValidationErrors(error.failures())

    const { id, ...data } = coerced
    const updatedUser = await prisma.user.update({ where: { id }, data })

    return updatedUser
  } catch (error) {
    const emailExists =
      error.code === codes.prisma.UNIQUE_VALIDATION_FAILURE &&
      error.meta?.target?.includes("email")

    if (emailExists)
      return new ServerError({
        message: `This email is already used by another account.`,
        report: false,
      })

    return error
  }
}
