import { allow, deny, rule, shield } from "graphql-shield"

const isAuthenticated = rule({
  cache: "contextual",
})((_: unused, __: unused, { me }) => Boolean(me))

const isSuperUser = rule({
  cache: "contextual",
})((_: unused, __: unused, { me }) => Boolean(me?.isSuperUser))

export const permissions = shield({
  Query: {
    "*": deny,
    me: isAuthenticated,
    user: isSuperUser,
    users: isSuperUser,
  },

  Mutation: {
    "*": deny,
    signup: allow,
    signin: allow,
    signout: allow,
    updateUser: isSuperUser,
  },
})
