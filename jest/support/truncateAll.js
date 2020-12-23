const getTableNames = require("./getTableNames")

module.exports = async (prisma) => {
  const tables = await getTableNames(prisma)
  await Promise.all(
    tables.map((t) => prisma.$executeRaw(`TRUNCATE "${t}" CASCADE;`))
  )
}
