import { context } from "../context"

type Context = typeof context
type unused = unknown

export const resolvers = {
  Query: {
    users: async (_: unused, __: unused, { prisma }: Context) =>
      prisma.user.findMany({ where: {} }),
  },
}
