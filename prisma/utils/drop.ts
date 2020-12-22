import { PrismaClient } from "@prisma/client"
import { allowOnlyIn } from "./allowOnlyIn"

type Arg = "all" | "tables" | "functions" | "sequences" | "enums"
type Args = Arg[]

// DROP SCHEMA is not available for managed databases on most providers.
// Thus we need the option to drop stuff manually.

// Examples:
//   await drop("all");
//   await drop("tables", "sequences");

export const drop = (...args: Args) => async (prisma: PrismaClient) => {
  allowOnlyIn("test", "dev", "staging")

  if (args.includes("all") || args.includes("tables")) await dropTables(prisma)

  if (args.includes("all") || args.includes("functions"))
    await dropFunctions(prisma)

  if (args.includes("all") || args.includes("sequences"))
    await dropSequences(prisma)

  if (args.includes("all") || args.includes("enums")) await dropEnums(prisma)
}

async function dropEnums(prisma: PrismaClient) {
  const _enums = await getEnums(prisma)
  await Promise.all(
    _enums.map((e: string) =>
      prisma.$executeRaw(`DROP TYPE IF EXISTS "${e}" CASCADE;`)
    )
  )
}

async function dropSequences(prisma: PrismaClient) {
  const _sequences = await getSequences(prisma)
  await Promise.all(
    _sequences.map((seq: string) =>
      prisma.$executeRaw(`DROP SEQUENCE IF EXISTS "${seq}" CASCADE;`)
    )
  )
}

async function dropFunctions(prisma: PrismaClient) {
  const _functions = await getFunctions(prisma)
  await Promise.all(
    _functions.map((fn: string) =>
      prisma.$executeRaw(`DROP FUNCTION IF EXISTS "${fn}" CASCADE;`)
    )
  )
}

async function dropTables(prisma: PrismaClient) {
  const result = await getTableNames(prisma)
  await Promise.all(
    result.map((name: string) =>
      prisma.$executeRaw(`DROP TABLE IF EXISTS "${name}" CASCADE;`)
    )
  )
}

async function getTableNames(prisma: PrismaClient) {
  const result = await prisma.$queryRaw(`
    SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_type='BASE TABLE';
  `)
  return result.map((o: any) => o.table_name)
}

async function getSequences(prisma: PrismaClient) {
  const result = await prisma.$queryRaw(
    `select relname from pg_class where relkind = 'S';`
  )
  return result.map((o: any) => o.relname)
}

async function getFunctions(prisma: PrismaClient) {
  const result = await prisma.$queryRaw(`
    SELECT
      n.nspname AS function_schema,
      p.proname AS function_name
    FROM
        pg_proc p
        LEFT JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE
        n.nspname NOT IN ('pg_catalog', 'information_schema')
    ORDER BY
        function_schema,
        function_name;
  `)
  return result.map((o: any) => o.function_name)
}

async function getEnums(prisma: PrismaClient) {
  const result = await prisma.$queryRaw(`
    SELECT pg_type.typname AS enumtype,
      pg_enum.enumlabel AS enumlabel
    FROM pg_type
    JOIN pg_enum
      ON pg_enum.enumtypid = pg_type.oid;
  `)
  return result.map((o: any) => o.enumtype)
}
