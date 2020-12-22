import { PrismaClient } from "@prisma/client"

export const getTableNames = async (prisma: PrismaClient) => {
  const result = await prisma.$queryRaw(`
    SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_type='BASE TABLE';
  `)
  return result
    .map((o: { table_name: string }) => o.table_name)
    .filter((t: string) => t !== "_prisma_migrations")
}
