import { allow, deny, rule, shield } from "graphql-shield"

const isAuthenticated = rule({ cache: "contextual" })(
  async (_: unused, __: unused, { req }) => {
    return Boolean(req?.session?.user?.id)
  }
)

const isSuperUser = rule({ cache: "contextual" })(
  async (_: unused, __: unused, { req }) => {
    return Boolean(req?.session?.user?.isSuperUser)
  }
)

export const permissions = shield({
  Query: {
    "*": deny,
    me: isAuthenticated,
    users: isSuperUser,
  },

  Mutation: {
    "*": deny,
    signup: allow,
    signin: allow,
    signout: allow,
  },
})
