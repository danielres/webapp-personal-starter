export const typeDefs = /* GraphQL */ `
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    isSuperUser: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    me: User
    users: [User]!
    user(id: Int!): User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): Boolean!
    signin(email: String!, password: String!): User
    signout: Boolean!
  }
`
