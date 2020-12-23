export const typeDefs = /* GraphQL */ `
  scalar Date
  scalar EmailAddress

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
`
