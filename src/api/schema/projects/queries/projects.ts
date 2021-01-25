import * as config from "../../../../../config"
import type { ProjectsQueryVariables } from "../../../../generated/operations"
import type { Context } from "../../../context"

export const projects = async (
  _: unused,
  args: ProjectsQueryVariables,
  { prisma }: Context
) => {
  const orderBy = args.orderBy ?? "name"
  const orderDirection = args.orderDirection ?? "asc"
  const skip = args.skip ?? 0
  const take = args.take ?? config.pagination.perPage.default

  return prisma.project.findMany({
    where: {},
    orderBy: [{ [orderBy]: orderDirection }],
    skip,
    take,
  })
}
