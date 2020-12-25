import { PrismaClient } from "@prisma/client"
import { ApolloServer } from "apollo-server-micro"
import { NextApiRequest, NextApiResponse } from "next"
import * as config from "../../config"
import { makeContext } from "./context"
import { middlewareCookieSession } from "./middleware/middlewareCookieSession"
import { resolvers } from "./schema/resolvers"
import { typeDefs } from "./schema/typeDefs"

export type Request = NextApiRequest & {
  session: null | Record<string, any>
}

export type Response = NextApiResponse

const makeHandler = ({ prisma = new PrismaClient() }) => (
  req: Request,
  res: Response
) => {
  const context = makeContext({ prisma })

  const apolloServer = new ApolloServer({
    context,
    typeDefs,
    resolvers,
  })

  const handler = apolloServer.createHandler({ path: config.graphql.endpoint })
  middlewareCookieSession(req, res)
  return handler(req, res)
}

export default makeHandler({ prisma: new PrismaClient() })

const nextConfig = { api: { bodyParser: false } }
export { nextConfig as config }
