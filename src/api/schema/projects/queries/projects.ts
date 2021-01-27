import type { ProjectsQueryVariables } from "../../../../generated/operations"
import type { Context } from "../../../context"
import { sortAndPaginate } from "../../../utils/resolvers"

export const projects = async (
  _: unused,
  args: ProjectsQueryVariables,
  { prisma }: Context
) => {
  return await prisma.project.findMany({ where: {}, ...sortAndPaginate(args) })
}
