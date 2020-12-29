import { GraphQLClient } from "graphql-request"
import * as config from "./config"
import { getSdkWithHooks } from "./src/generated/operations"

const { endpoint } = config.graphql

const request = new GraphQLClient(endpoint)

export const sdk = getSdkWithHooks(request)
