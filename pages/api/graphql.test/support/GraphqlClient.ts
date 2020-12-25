// GraphQL client for api integration tests

import request from "supertest"
import handler from "../../graphql"
import * as config from "../../../../config"

const { endpoint: defaultEndpoint } = config.graphql

export const GraphqlClient = ({ endpoint = defaultEndpoint } = {}) => {
  const client = async (query: string, variables = {}) => {
    const { body, headers } = await request(handler)
      .post(endpoint)
      .send({ query, variables })

    return { body, headers }
  }

  return client
}
