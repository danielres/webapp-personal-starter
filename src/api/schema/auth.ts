import { inviteByEmail } from "./auth/mutations/inviteByEmail"
import { resendVerificationEmail } from "./auth/mutations/resendVerificationEmail"
import { resetPasswordBegin } from "./auth/mutations/resetPassword.begin"
import { resetPasswordFinish } from "./auth/mutations/resetPassword.finish"
import { signin } from "./auth/mutations/signin"
import { signout } from "./auth/mutations/signout"
import { signup } from "./auth/mutations/signup"
import { signupWithInvitation } from "./auth/mutations/signupWithInvitation"
import { verifyEmail } from "./auth/mutations/verifyEmail"
import { me } from "./auth/queries/me"

export const typeDefs = /* GraphQL */ `
  extend type Query {
    me: User
  }

  extend type Mutation {
    inviteByEmail(email: String!, isSuperUser: Boolean): Boolean!
    resendVerificationEmail: Boolean!
    resetPasswordBegin(email: String!, password: String!): Boolean!
    resetPasswordFinish(secret: String!): Boolean!
    signin(email: String!, password: String!): User
    signout: Boolean!
    signup(email: String!, password: String!, name: String!): Boolean!
    signupWithInvitation(
      password: String!
      name: String!
      secret: String!
    ): Boolean!
    verifyEmail(emailVerificationSecret: String!): VerifyEmailResponse!
  }

  type VerifyEmailResponse {
    email: String
    name: String
  }
`

export const resolvers = {
  Query: {
    me,
  },

  Mutation: {
    inviteByEmail,
    resendVerificationEmail,
    resetPasswordBegin,
    resetPasswordFinish,
    signin,
    signout,
    signup,
    signupWithInvitation,
    verifyEmail,
  },
}
