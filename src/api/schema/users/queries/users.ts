import * as config from "../../../../../config"
import type { UsersQueryVariables } from "../../../../generated/operations"
import type { Context } from "../../../context"

export const users = async (
  _: unused,
  args: UsersQueryVariables,
  { prisma }: Context
) => {
  const orderBy = args.orderBy ?? "name"
  const orderDirection = args.orderDirection ?? "asc"
  const skip = args.skip ?? 0
  const take = args.take ?? config.pagination.perPage.default

  return prisma.user.findMany({
    where: {},
    orderBy: [{ [orderBy]: orderDirection }],
    skip,
    take,
  })
}
