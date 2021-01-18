import type { UpdateUserMutationVariables } from "../../../../generated/operations"
import { UpdateUserInput, validate } from "../../../../validators/structs"
import type { Context } from "../../../context"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { NotAuthenticatedError } from "../../../errors/NotAuthenticatedError"
import { ServerError } from "../../../errors/ServerError"

export const updateUser = async (
  _: unused,
  args: UpdateUserMutationVariables,
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

    const [error] = validate(coerced, UpdateUserInput)
    if (error) return new ValidationErrors(error.failures())

    const { id, ...data } = coerced
    const updatedUser = await prisma.user.update({ where: { id }, data })

    return updatedUser
  } catch (error) {
    return error
  }
}
