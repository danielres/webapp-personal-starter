import { PrismaClient } from "@prisma/client"
import { getTableNames } from "./getTableNames"

export const truncateAll = async (prisma: PrismaClient) => {
  const tables = await getTableNames(prisma)
  await Promise.all(
    tables.map((t: string) => prisma.$executeRaw(`TRUNCATE "${t}" CASCADE;`))
  )
}
