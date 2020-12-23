import { ApolloServer } from "apollo-server-micro"
import { context } from "./context"
import { resolvers } from "./schema/resolvers"
import { typeDefs } from "./schema/typeDefs"

const apolloServer = new ApolloServer({
  context,
  typeDefs,
  resolvers,
})

export default apolloServer.createHandler({ path: "/api/graphql" })
export const config = { api: { bodyParser: false } }
