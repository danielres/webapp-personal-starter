import { PrismaClient } from "@prisma/client"
import * as password from "../src/utils/password"
import { fakeUsersData } from "./seed/fakeUsersData"
import { allowOnlyIn } from "./utils/allowOnlyIn"

allowOnlyIn("dev", "test", "staging")

const prisma = new PrismaClient()

async function main() {
  if (process.argv[2] === "purge=true") {
    await prisma.project.deleteMany({ where: {} })
    await prisma.user.deleteMany({ where: {} })
  }

  const pw = "big-red-fox"
  const hashedPassword = await password.hash(pw)

  const superuser = await prisma.user.create({
    data: {
      email: "superuser@example.com",
      name: "Superuser",
      password: hashedPassword,
      isSuperUser: true,
      emailVerifiedAt: new Date(),
    },
  })

  await prisma.user.update({
    where: { id: superuser.id },
    data: { approvedBy: { connect: { id: superuser.id } } },
  })

  await Promise.all(
    Array.from(Array(60).keys()).map((i) =>
      prisma.project.create({
        data: { name: `Project ${i + 1}`, ownerId: superuser.id },
      })
    )
  )

  for (const u of fakeUsersData) {
    const data = { name: u.name, email: u.email, password: hashedPassword }
    await prisma.user.create({ data })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
