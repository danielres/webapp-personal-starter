/** @usePrisma */

import { GraphqlClient } from "./support/GraphqlClient"
import { mutations } from "./support/operations"
import { JestGlobal } from "jest/types.d"

declare const global: JestGlobal
const { prisma } = global

const client = GraphqlClient({ prisma })

const name = "test-user"
const email = "test-user@example.com"
const password = "12345678"

describe("auth flow", () => {
  describe("when previously signed up", () => {
    beforeAll(() => client(mutations.signup, { email, name, password }))

    test("signin returns user details + sets signed session cookie", async () => {
      const { body, headers } = await client(mutations.signin, {
        email,
        password,
      })

      const expected = { name, email, isSuperUser: true }

      expect(body.data.signin).toMatchObject(expected)

      const cookieNames = headers["set-cookie"].map(
        (c: string) => c.split("=")[0]
      )

      const cookieValues = headers["set-cookie"].map(
        (c: string) => c.split("=")[1].split(";")[0]
      )

      expect(cookieNames).toMatchObject(["session", "session.sig"])

      cookieValues.forEach((value: string) => {
        expect(typeof value).toEqual("string")
        expect(value.length > 0).toBe(true)
      })
    })
  })
})
