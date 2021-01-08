import { resendVerificationEmail } from "./resolvers/mutations/resendVerificationEmail"
import { signin } from "./resolvers/mutations/signin"
import { signout } from "./resolvers/mutations/signout"
import { signup } from "./resolvers/mutations/signup"
import { updateUser } from "./resolvers/mutations/updateUser"
import { verifyEmail } from "./resolvers/mutations/verifyEmail"
import { me } from "./resolvers/queries/me"
import { user } from "./resolvers/queries/user"
import { users } from "./resolvers/queries/users"

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
