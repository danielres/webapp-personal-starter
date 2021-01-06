import { Context } from "src/api/context"

export const users = async (_: unused, __: unused, { prisma }: Context) =>
  prisma.user.findMany({ where: {} })
