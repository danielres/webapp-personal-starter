import { PrismaClient } from "@prisma/client"
import { Request, Response } from "./graphql"

export type ContextArgs = {
  req: Request
  res: Response
}

export type Context = {
  prisma: PrismaClient
  req: Request
  res: Response
}

export const makeContext = ({ prisma }: { prisma: PrismaClient }) => ({
  req,
  res,
}: ContextArgs) => ({
  prisma,
  req,
  res,
})
