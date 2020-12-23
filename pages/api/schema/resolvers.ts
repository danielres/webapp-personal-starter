import { EmailAddressResolver } from "graphql-scalars"
import { PasswordResolver } from "./resolvers/scalars/PasswordResolver"
import { Context, unused } from "./resolvers/types"

export const resolvers = {
  EmailAddress: EmailAddressResolver,
  Password: PasswordResolver,

  Query: {
    users: async (_: unused, __: unused, { prisma }: Context) =>
      prisma.user.findMany({ where: {} }),
  },

  Mutation: {
    signup: async (
      _: unused,
      args: { email: string; name: string; password: string },
      { prisma }: Context
    ) => prisma.user.create({ data: args }),
  },
}
