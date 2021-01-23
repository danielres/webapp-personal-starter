/** @usePrisma */
import type { JestGlobal } from "../../jest/types.d"

declare const global: JestGlobal
const { prisma } = global

const owner1Data = { name: "o1", email: "o1@example.com", password: "xxx" }
const owner2Data = { name: "o2", email: "o2@example.com", password: "xxx" }

const user1Data = { email: "u1@example.com", name: "u1", password: "xxx" }
const user2Data = { email: "u2@example.com", name: "u2", password: "xxx" }

describe("Project", () => {
  describe("Relations", () => {
    it("has an owner user", async () => {
      const owner = await prisma.user.create({ data: owner1Data })

      const p1 = await prisma.project.create({
        data: { name: "p1", ownerId: owner.id },
        include: { owner: true },
      })

      const p2 = await prisma.project.create({
        data: { name: "p2", ownerId: owner.id },
        include: { owner: true },
      })

      const userWithProjects = await prisma.user.findUnique({
        where: { email: owner1Data.email },
        include: { projectsAsOwner: true },
      })

      if (!userWithProjects)
        throw new Error("Testing error: userWithProjects not found")

      expect(p1.owner.id).toEqual(owner.id)
      expect(p2.owner.id).toEqual(owner.id)

      expect(userWithProjects?.projectsAsOwner).toMatchObject([
        { name: "p1" },
        { name: "p2" },
      ])
    })

    it("has user memberships", async () => {
      const owner = await prisma.user.create({ data: owner2Data })
      const u1 = await prisma.user.create({ data: user1Data })
      const u2 = await prisma.user.create({ data: user2Data })

      const p3 = await prisma.project.create({
        data: { name: "p3", ownerId: owner.id },
      })
      const p4 = await prisma.project.create({
        data: { name: "p4", ownerId: owner.id },
      })

      const p3WithMembers = await prisma.project.update({
        where: { name: "p3" },
        data: {
          members: {
            connect: [{ email: user1Data.email }, { email: user2Data.email }],
          },
        },
        include: { members: true },
      })
      const p4WithMember = await prisma.project.update({
        where: { name: "p4" },
        data: {
          members: {
            connect: [{ email: user1Data.email }],
          },
        },
        include: { members: true },
      })

      expect(p3WithMembers).toMatchObject({
        name: "p3",
        members: [{ name: "u1" }, { name: "u2" }],
      })
      expect(p4WithMember).toMatchObject({
        name: "p4",
        members: [{ name: "u1" }],
      })

      const u1AsMember = await prisma.user.findUnique({
        where: { email: "u1@example.com" },
        include: { projectsAsMember: true },
      })

      const u2AsMember = await prisma.user.findUnique({
        where: { email: "u2@example.com" },
        include: { projectsAsMember: true },
      })

      expect(u1AsMember?.projectsAsMember.length).toEqual(2)
      expect(u1AsMember).toMatchObject({
        email: "u1@example.com",
        projectsAsMember: [{ name: "p3" }, { name: "p4" }],
      })

      expect(u2AsMember?.projectsAsMember.length).toEqual(1)
      expect(u2AsMember).toMatchObject({
        email: "u2@example.com",
        projectsAsMember: [{ name: "p3" }],
      })
    })
  })
})
