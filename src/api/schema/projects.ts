import { Project } from "@prisma/client"
import { Context } from "./../context"
import { projectCreate } from "./projects/mutations/project.create"
import { projectUpdate } from "./projects/mutations/project.update"
import { project } from "./projects/queries/project"
import { projects } from "./projects/queries/projects"

export const typeDefs = /* GraphQL */ `
  extend type Query {
    project(id: Int!): Project
    projects: [Project]!
  }

  extend type Mutation {
    projectCreate(name: String!): Project
    projectUpdate(
      id: Int!
      name: String
      newMemberIds: [Int]
      removedMemberIds: [Int]
    ): Project
  }

  type Project {
    id: Int!
    name: String!
    owner: User!
    members: [User]!
    createdAt: Date!
    updatedAt: Date!
  }
`

export const resolvers = {
  Query: {
    project,
    projects,
  },

  Mutation: {
    projectCreate,
    projectUpdate,
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
}
