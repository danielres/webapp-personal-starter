import { PrismaClient } from "@prisma/client"
import { ApolloServer, makeExecutableSchema } from "apollo-server-micro"
import { applyMiddleware } from "graphql-middleware"
import type { NextApiRequest, NextApiResponse } from "next"
import * as config from "../../config"
import { makeContext } from "./context"
import { formatError } from "./formatError"
import { middlewareCookieSession } from "./middleware/middlewareCookieSession"
import { permissions } from "./permissions"
import { resolvers, typeDefs } from "./schema"
export type Request = NextApiRequest & {
  session: null | Record<string, any>
}

export type Response = NextApiResponse

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions
)

export const makeHandler = ({ prisma = new PrismaClient() }) => (
  req: Request,
  res: Response
) => {
  const context = makeContext({ prisma })

  const apolloServer = new ApolloServer({
    context,
    formatError,
    schema,
  })

  const handler = apolloServer.createHandler({ path: config.graphql.endpoint })
  middlewareCookieSession(req, res)
  return handler(req, res)
}

export default makeHandler({
  prisma: new PrismaClient({ log: config.prisma.log as any }),
})

const nextConfig = { api: { bodyParser: false } }
export { nextConfig as config }
