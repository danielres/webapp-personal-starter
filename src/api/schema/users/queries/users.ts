import type { UsersQueryVariables } from "../../../../generated/operations"
import type { Context } from "../../../context"
import { sortAndPaginate } from "../../../utils/resolvers"

export const users = async (
  _: unused,
  args: UsersQueryVariables,
  { prisma }: Context
) => {
  return await prisma.user.findMany({ where: {}, ...sortAndPaginate(args) })
}
