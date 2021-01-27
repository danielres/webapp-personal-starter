import type { User } from "@prisma/client"
import type { Context } from "../context"
import { userUpdate } from "./users/mutations/user.update"
import { user } from "./users/queries/user"
import { users } from "./users/queries/users"

export const typeDefs = /* GraphQL */ `
  extend type Query {
    user(id: Int!): User
    users(
      orderBy: String
      orderDirection: String
      take: Int
      skip: Int
    ): [User]!
    usersCount: Int
  }

  extend type Mutation {
    userUpdate(
      id: Int!
      email: String
      name: String
      isSuperUser: Boolean
      isApproved: Boolean
    ): User
  }

  type User {
    id: Int!
    name: String!
    email: String!
    isApproved: Boolean!
    isSuperUser: Boolean!
    emailVerifiedAt: Date
    createdAt: Date!
    updatedAt: Date!
  }
`

export const resolvers = {
  Query: {
    user,
    users,
    usersCount: async (_: unused, __: unused, { prisma }: Context) =>
      prisma.user.count(),
  },

  Mutation: {
    userUpdate,
  },

  User: {
    isApproved: (user: User) => Boolean(user.approvedById),
  },
}
