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

export const context = ({ req, res }: ContextArgs) => ({
  prisma: new PrismaClient(),
  req,
  res,
})
