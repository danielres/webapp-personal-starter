const { PrismaClient } = require("@prisma/client")

module.exports = async (prisma) => {
  const result = await prisma.$queryRaw(`
    SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_type='BASE TABLE';
  `)

  return result
    .map((o) => o.table_name)
    .filter((t) => t !== "_prisma_migrations")
}
