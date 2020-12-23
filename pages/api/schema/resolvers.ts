import { EmailAddressResolver } from "graphql-scalars"
import { context } from "../context"
import { PasswordResolver } from "./scalars/PasswordResolver"

type Context = typeof context
type unused = unknown

export const resolvers = {
  EmailAddress: EmailAddressResolver,
  Password: PasswordResolver,

  Query: {
    users: async (_: unused, __: unused, { prisma }: Context) =>
      prisma.user.findMany({ where: {} }),
  },
}
