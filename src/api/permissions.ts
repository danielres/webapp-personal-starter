import { allow, and, deny, rule, shield } from "graphql-shield"

const isAuthenticated = rule({
  cache: "contextual",
})((_: unused, __: unused, { me }) => Boolean(me))

const isSuperUser = rule({
  cache: "contextual",
})((_: unused, __: unused, { me }) => Boolean(me?.isSuperUser))

const isVerifiedEmail = rule({
  cache: "contextual",
})((_: unused, __: unused, { me }) => Boolean(me?.emailVerifiedAt))

export const permissions = shield({
  Query: {
    "*": deny,
    me: allow,
    user: and(isSuperUser, isVerifiedEmail),
    users: and(isSuperUser, isVerifiedEmail),
  },

  Mutation: {
    "*": deny,
    inviteByEmail: and(isSuperUser, isVerifiedEmail),
    resendVerificationEmail: allow,
    signup: allow,
    signin: allow,
    signout: allow,
    updateUser: and(isSuperUser, isVerifiedEmail),
    verifyEmail: allow,
  },
})
