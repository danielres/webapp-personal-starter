import { UserQueryVariables } from "../../../../generated/operations"
import { Context } from "../../../context"

export const user = async (
  _: unused,
  args: UserQueryVariables,
  { prisma }: Context
) => prisma.user.findUnique({ where: { id: args.id } })
