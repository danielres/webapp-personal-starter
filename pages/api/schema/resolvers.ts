import { EmailAddressResolver } from "graphql-scalars"
import { context } from "../context"

type Context = typeof context
type unused = unknown

export const resolvers = {
  EmailAddress: EmailAddressResolver,

  Query: {
    users: async (_: unused, __: unused, { prisma }: Context) =>
      prisma.user.findMany({ where: {} }),
  },
}
