import type { UpdateUserMutationVariables } from "../../../../generated/operations"
import { UpdateUserInput, validate } from "../../../../validators/structs"
import type { Context } from "../../../context"
import { ValidationErrors } from "../../../errors/InputValidationError"

export const updateUser = async (
  _: unused,
  args: UpdateUserMutationVariables,
  { prisma }: Context
) => {
  const coerced = {
    email: args.email ?? undefined,
    name: args.name ?? undefined,
    id: args.id,
  }

  const [error] = validate(coerced, UpdateUserInput)
  if (error) return new ValidationErrors(error.failures())

  const { id, ...data } = coerced
  const updatedUser = await prisma.user.update({ where: { id }, data })

  return updatedUser
}
