export const typeDefs = /* GraphQL */ `
  scalar Date

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

  type Query {
    me: User
    user(id: Int!): User
    users: [User]!
  }

  type VerifyEmailResponse {
    email: String
    name: String
  }

  type Mutation {
    inviteByEmail(email: String!, isSuperUser: Boolean): Boolean!
    resendVerificationEmail: Boolean!
    resetPasswordBegin(email: String!, password: String!): Boolean!
    resetPasswordFinish(secret: String!): Boolean!
    signup(email: String!, password: String!, name: String!): Boolean!
    signupWithInvitation(
      password: String!
      name: String!
      secret: String!
    ): Boolean!
    signin(email: String!, password: String!): User
    signout: Boolean!
    updateUser(
      id: Int!
      email: String
      name: String
      isSuperUser: Boolean
      isApproved: Boolean
    ): User
    verifyEmail(emailVerificationSecret: String!): VerifyEmailResponse!
  }
`
