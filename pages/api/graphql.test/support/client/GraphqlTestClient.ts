// GraphQL client for api integration tests

import { PrismaClient } from "@prisma/client"
import request from "supertest"
import * as config from "../../../../../config"
import { makeHandler } from "../../../graphql"

const { endpoint: defaultEndpoint } = config.graphql

export const GraphqlTestClient = ({
  endpoint = defaultEndpoint,
  prisma = new PrismaClient(),
}) => {
  const handler = makeHandler({ prisma })

  const client = async (query: string, variables = {}) => {
    const { body, headers } = await request(handler)
      .post(endpoint)
      .send({ query, variables })

    return { body, headers }
  }

  return client
}
