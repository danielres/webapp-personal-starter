import { ApolloServer } from "apollo-server-micro"
import { IncomingMessage, ServerResponse } from "http"
import { context } from "./context"
import { middlewareCookieSession } from "./middleware/middlewareCookieSession"
import { resolvers } from "./schema/resolvers"
import { typeDefs } from "./schema/typeDefs"

export type Request = IncomingMessage & {
  session: null | Record<string, any>
}

export type Response = ServerResponse

const apolloServer = new ApolloServer({
  context,
  typeDefs,
  resolvers,
})

const handler = apolloServer.createHandler({ path: "/api/graphql" })

export default (req: Request, res: Response) => {
  middlewareCookieSession(req, res)
  return handler(req, res)
}

export const config = { api: { bodyParser: false } }
