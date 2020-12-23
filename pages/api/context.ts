import { PrismaClient } from "@prisma/client"

export const context = {
  prisma: new PrismaClient(),
}
