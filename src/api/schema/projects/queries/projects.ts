import type { Context } from "../../../context"

export const projects = (_: unused, __: unused, { prisma }: Context) =>
  prisma.project.findMany({ where: {} })
