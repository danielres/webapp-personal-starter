import type { User } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "./graphql"

export type ContextArgs = {
  req: Request
  res: Response
}

export type Context = {
  me?: User
  prisma: PrismaClient
  req: Request
}

export const makeContext = ({ prisma }: { prisma: PrismaClient }) => async ({
  req,
}: ContextArgs) => {
  const id = req.session?.user?.id
  const me = id ? await prisma.user.findUnique({ where: { id } }) : null

  return {
    me,
    prisma,
    req,
  }
}
