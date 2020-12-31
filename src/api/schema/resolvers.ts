import { UserQueryVariables } from "../../generated/operations"
import { Context } from "../context"
import { signin } from "./resolvers/mutations/signin"
import { signout } from "./resolvers/mutations/signout"
import { signup } from "./resolvers/mutations/signup"
import { updateUser } from "./resolvers/mutations/updateUser"
import { me } from "./resolvers/queries/me"

export const resolvers = {
  Query: {
    me,

    user: async (_: unused, args: UserQueryVariables, { prisma }: Context) =>
      prisma.user.findUnique({ where: { id: args.id } }),

    users: async (_: unused, __: unused, { prisma }: Context) =>
      prisma.user.findMany({ where: {} }),
  },

  Mutation: {
    signin,
    signup,
    signout,
    updateUser,
  },
}
