import type { Project, User } from "@prisma/client"
import type { Context } from "../context"
import { inviteByEmail } from "./resolvers/mutations/inviteByEmail"
import { projectCreate } from "./resolvers/mutations/project.create"
import { projectUpdate } from "./resolvers/mutations/project.update"
import { resendVerificationEmail } from "./resolvers/mutations/resendVerificationEmail"
import { resetPasswordBegin } from "./resolvers/mutations/resetPassword.begin"
import { resetPasswordFinish } from "./resolvers/mutations/resetPassword.finish"
import { signin } from "./resolvers/mutations/signin"
import { signout } from "./resolvers/mutations/signout"
import { signup } from "./resolvers/mutations/signup"
import { signupWithInvitation } from "./resolvers/mutations/signupWithInvitation"
import { updateUser } from "./resolvers/mutations/updateUser"
import { verifyEmail } from "./resolvers/mutations/verifyEmail"
import { me } from "./resolvers/queries/me"
import { project } from "./resolvers/queries/project"
import { projects } from "./resolvers/queries/projects"
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

    project,
    projects,
  },

  Mutation: {
    inviteByEmail,
    resendVerificationEmail,
    resetPasswordBegin,
    resetPasswordFinish,
    signin,
    signup,
    signupWithInvitation,
    signout,
    verifyEmail,

    projectCreate,
    projectUpdate,

    updateUser,
  },

  Project: {
    owner: (project: Project, args: unused, { prisma }: Context) =>
      prisma.user.findUnique({ where: { id: project.ownerId } }),

    members: async (project: Project, args: unused, { prisma }: Context) => {
      const dbProject = await prisma.project.findUnique({
        where: { id: project.id },
        include: { members: true },
      })

      return dbProject?.members ?? []
    },
  },

  User: {
    isApproved: (user: User) => Boolean(user.approvedById),
  },
}
