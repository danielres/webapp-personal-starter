import type { UserDeleteMutationVariables } from "../../../../generated/operations"
import type { Context } from "../../../context"

export const userDelete = async (
  _: unused,
  args: UserDeleteMutationVariables,
  { prisma }: Context
) => {
  try {
    return await prisma.user.delete({ where: { id: args.id } })
  } catch (error) {
    return error
  }
}
