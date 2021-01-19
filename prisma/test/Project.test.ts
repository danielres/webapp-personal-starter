/** @usePrisma */
import type { JestGlobal } from "../../jest/types.d"

declare const global: JestGlobal
const { prisma } = global

const ownerData = { name: "owner", email: "owner@example.com", password: "xxx" }

describe("Project", () => {
  describe("Relations", () => {
    it("has an owner user", async () => {
      const owner = await prisma.user.create({ data: ownerData })

      const p1 = await prisma.project.create({
        data: { name: "p1", ownerId: owner.id },
        include: { owner: true },
      })

      const p2 = await prisma.project.create({
        data: { name: "p2", ownerId: owner.id },
        include: { owner: true },
      })

      const userWithProjects = await prisma.user.findUnique({
        where: { email: ownerData.email },
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
  })
})
