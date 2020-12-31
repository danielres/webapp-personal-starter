export const typeDefs = /* GraphQL */ `
  scalar Date

  type User {
    id: Int!
    name: String!
    email: String!
    isSuperUser: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    me: User
    user(id: Int!): User
    users: [User]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): Boolean!
    signin(email: String!, password: String!): User
    signout: Boolean!
    updateUser(id: Int!, email: String, name: String): User
  }
`
