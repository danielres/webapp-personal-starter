import lodash from "lodash"
import * as auth from "./schema/auth"
import * as base from "./schema/base"
import * as projects from "./schema/projects"
import * as users from "./schema/users"

export const typeDefs = [
  base.typeDefs,
  auth.typeDefs,
  projects.typeDefs,
  users.typeDefs,
]

// Error handling in resolvers:
//
//   1) Thrown errors:
//        - are blocked by graphql-shield and result in an "Non authorized" message.
//
//   2) Returned errors:
//        - are NOT blocked by graphql-shield and are handled by formatError.
//
//   Please refer to comments within formatError for more details.
//

export const resolvers = lodash.merge(
  base.resolvers,
  auth.resolvers,
  projects.resolvers,
  users.resolvers
)
