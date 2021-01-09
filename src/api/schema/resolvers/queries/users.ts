import { Context } from "../../../context"

export const users = async (_: unused, __: unused, { prisma }: Context) =>
  prisma.user.findMany({ where: {} })
