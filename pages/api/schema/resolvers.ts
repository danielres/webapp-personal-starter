import { EmailAddressResolver } from "graphql-scalars"
import { signin } from "./resolvers/mutations/signin"
import { signup } from "./resolvers/mutations/signup"
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
    signin,
    signup,
  },
}
