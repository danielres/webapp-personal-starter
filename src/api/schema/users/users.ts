import { User } from "@prisma/client"
import { updateUser } from "./mutations/updateUser"
import { user } from "./queries/user"
import { users } from "./queries/users"

export const typeDefs = /* GraphQL */ `
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

  extend type Query {
    user(id: Int!): User
    users: [User]!
  }

  extend type Mutation {
    updateUser(
      id: Int!
      email: String
      name: String
      isSuperUser: Boolean
      isApproved: Boolean
    ): User
  }
`

export const resolvers = {
  Query: {
    user,
    users,
  },
  Mutation: {
    updateUser,
  },

  User: {
    isApproved: (user: User) => Boolean(user.approvedById),
  },
}
