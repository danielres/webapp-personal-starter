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

    project: and(isSuperUser, isVerifiedEmail),
    projects: and(isSuperUser, isVerifiedEmail),
    projectsCount: and(isSuperUser, isVerifiedEmail),

    user: and(isSuperUser, isVerifiedEmail),
    users: and(isSuperUser, isVerifiedEmail),
    usersCount: and(isSuperUser, isVerifiedEmail),
  },

  Mutation: {
    "*": deny,

    inviteByEmail: and(isSuperUser, isVerifiedEmail),
    resendVerificationEmail: allow,
    resetPasswordBegin: allow,
    resetPasswordFinish: allow,
    signup: allow,
    signupWithInvitation: allow,
    signin: allow,
    signout: allow,
    verifyEmail: allow,

    projectCreate: isSuperUser,
    projectUpdate: isSuperUser,

    updateUser: and(isSuperUser, isVerifiedEmail),
  },
})
