export const typeDefs = /* GraphQL */ `
  scalar Date
  scalar EmailAddress
  scalar Password

  type User {
    id: ID!
    name: String!
    email: EmailAddress!
    isSuperUser: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    users: [User]!
  }

  type Mutation {
    signup(email: EmailAddress!, password: Password!, name: String!): Boolean!
    signin(email: EmailAddress!, password: Password!): User
    signout: Boolean!
  }
`
