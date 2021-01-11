import { resendVerificationEmail } from "./resolvers/mutations/resendVerificationEmail"
import { signin } from "./resolvers/mutations/signin"
import { signout } from "./resolvers/mutations/signout"
import { signup } from "./resolvers/mutations/signup"
import { updateUser } from "./resolvers/mutations/updateUser"
import { verifyEmail } from "./resolvers/mutations/verifyEmail"
import { me } from "./resolvers/queries/me"
import { user } from "./resolvers/queries/user"
import { users } from "./resolvers/queries/users"

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

export const resolvers = {
  Query: {
    me,
    user,
    users,
  },

  Mutation: {
    resendVerificationEmail,
    signin,
    signup,
    signout,
    updateUser,
    verifyEmail,
  },
}
