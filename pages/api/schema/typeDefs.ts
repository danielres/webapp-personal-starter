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
    users: [User]!
  }
`
