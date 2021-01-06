import { Context } from "src/api/context"
import { UserQueryVariables } from "src/generated/operations"

export const user = async (
  _: unused,
  args: UserQueryVariables,
  { prisma }: Context
) => prisma.user.findUnique({ where: { id: args.id } })
