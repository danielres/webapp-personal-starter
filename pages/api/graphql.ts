import { ApolloServer } from "apollo-server-micro"
import { NextApiRequest, NextApiResponse } from "next"
import * as config from "../../config"
import { context } from "./context"
import { middlewareCookieSession } from "./middleware/middlewareCookieSession"
import { resolvers } from "./schema/resolvers"
import { typeDefs } from "./schema/typeDefs"

export type Request = NextApiRequest & {
  session: null | Record<string, any>
}

export type Response = NextApiResponse

const apolloServer = new ApolloServer({
  context,
  typeDefs,
  resolvers,
})

const handler = apolloServer.createHandler({ path: config.graphql.endpoint })

export default (req: Request, res: Response) => {
  middlewareCookieSession(req, res)
  return handler(req, res)
}

const nextConfig = { api: { bodyParser: false } }
export { nextConfig as config }
