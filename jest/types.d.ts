import { PrismaClient } from "@prisma/client"

export interface JestGlobal extends NodeJS.Global {
  prisma: PrismaClient
}
