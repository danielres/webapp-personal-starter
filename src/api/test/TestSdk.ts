import { GraphQLClient } from "graphql-request"
import { JestGlobal } from "jest/types"
import request from "supertest"
import * as config from "../../../config"
import { getSdk, SdkFunctionWrapper } from "../../generated/operations"
import { makeHandler } from "../graphql"

const { prisma: globalPrisma } = (global as unknown) as JestGlobal

// Warning: TestSdk agent is stateful regarding cookies
// Therefore, tests using cookies need new TestSdk() instances to achieve isolation

const ORIGIN = config.emails.test.origin

export const TestSdk = ({ prisma = globalPrisma } = {}) => {
  const handler = makeHandler({ prisma })
  const agent = request.agent(handler)

  const testClient = {
    request: (query: any, variables: any) =>
      agent
        .post(config.graphql.endpoint)
        .send({ query, variables })
        .set("origin", ORIGIN),
  }

  const wrapper = async (sdkFunction: () => Promise<any>) => {
    const res = await sdkFunction()
    return res.body
  }

  const sdk = getSdk(
    (testClient as unknown) as GraphQLClient,
    wrapper as SdkFunctionWrapper
  )

  return sdk
}
