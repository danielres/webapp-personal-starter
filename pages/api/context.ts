import { PrismaClient } from "@prisma/client"
import { IncomingMessage, ServerResponse } from "http"

export type ContextArgs = {
  req: IncomingMessage
  res: ServerResponse
}

export type Context = ContextArgs & {
  prisma: PrismaClient
}

export const context = ({ req, res }: ContextArgs) => ({
  prisma: new PrismaClient(),
  req,
  res,
})
