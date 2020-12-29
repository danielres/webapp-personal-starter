import { EmailAddressResolver } from "graphql-scalars"
import { Context } from "../context"
import { signin } from "./resolvers/mutations/signin"
import { signout } from "./resolvers/mutations/signout"
import { signup } from "./resolvers/mutations/signup"
import { me } from "./resolvers/queries/me"
import { PasswordResolver } from "./resolvers/scalars/PasswordResolver"

export const resolvers = {
  EmailAddress: EmailAddressResolver,
  Password: PasswordResolver,

  Query: {
    me,
    users: async (_: unused, __: unused, { prisma }: Context) =>
      prisma.user.findMany({ where: {} }),
  },

  Mutation: {
    signin,
    signup,
    signout,
  },
}
