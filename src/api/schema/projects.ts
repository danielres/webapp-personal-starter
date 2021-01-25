import { Project } from "@prisma/client"
import type { Context } from "./../context"
import { projectCreate } from "./projects/mutations/project.create"
import { projectUpdate } from "./projects/mutations/project.update"
import { project } from "./projects/queries/project"
import { projects } from "./projects/queries/projects"

export const typeDefs = /* GraphQL */ `
  extend type Query {
    project(id: Int!): Project
    projects(
      orderBy: String
      orderDirection: String
      take: Int
      skip: Int
    ): [Project]!
    projectsCount: Int
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
    projectsCount: async (_: unused, __: unused, { prisma }: Context) =>
      prisma.project.count(),
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
