import type { ProjectQueryVariables } from "../../../../generated/operations"
import type { Context } from "../../../context"

export const project = async (
  _: unused,
  args: ProjectQueryVariables,
  { prisma }: Context
) => prisma.project.findUnique({ where: { id: args.id } })
