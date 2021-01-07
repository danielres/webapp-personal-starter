import { signin } from "./resolvers/mutations/signin"
import { signout } from "./resolvers/mutations/signout"
import { signup } from "./resolvers/mutations/signup"
import { updateUser } from "./resolvers/mutations/updateUser"
import { me } from "./resolvers/queries/me"
import { user } from "./resolvers/queries/user"
import { users } from "./resolvers/queries/users"
import { verifyEmail } from "./resolvers/mutations/verifyEmail"

export const resolvers = {
  Query: {
    me,
    user,
    users,
  },

  Mutation: {
    signin,
    signup,
    signout,
    updateUser,
    verifyEmail,
  },
}
