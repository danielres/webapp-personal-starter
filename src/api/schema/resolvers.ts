import { Context } from "../context"
import { signin } from "./resolvers/mutations/signin"
import { signout } from "./resolvers/mutations/signout"
import { signup } from "./resolvers/mutations/signup"
import { me } from "./resolvers/queries/me"

export const resolvers = {
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
