/** @usePrisma */
import type { JestGlobal } from "../../jest/types.d"

declare const global: JestGlobal
const { prisma } = global

describe("User.create", () => {
  it("works", async () => {
    const { id } = await prisma.user.create({
      data: {
        email: "user@example.com",
        name: "User",
        password: "123",
      },
    })

    const actual = await prisma.user.findUnique({ where: { id } })

    expect(actual).toMatchObject({
      email: "user@example.com",
      name: "User",
    })
  })
})
