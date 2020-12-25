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

    test("signin returns user details + sets signed session cookies", async () => {
      const { body, headers } = await client(mutations.signin, {
        email,
        password,
      })

      const expected = { name, email, isSuperUser: true }

      expect(body.data.signin).toMatchObject(expected)

      expect(headers["set-cookie"].length).toEqual(2)

      expect(getCookieNames(headers)).toMatchObject(["session", "session.sig"])

      getCookieValues(headers).forEach((value: string) => {
        expect(typeof value).toEqual("string")
        expect(value.length > 0).toBe(true)
      })
    })
  })
  describe("signout ", () => {
    it("deletes session cookies", async () => {
      const { headers } = await client(mutations.signout)
      expect(headers["set-cookie"].length).toEqual(2)
      expect(getCookieNames(headers)).toMatchObject(["session", "session.sig"])

      headers["set-cookie"].forEach((element: string) =>
        expect(element).toMatch("expires=Thu, 01 Jan 1970")
      )
    })
  })
})

function getCookieNames(headers: { "set-cookie": string[] }) {
  return headers["set-cookie"].map((c: string) => c.split("=")[0])
}

function getCookieValues(headers: { "set-cookie": string[] }) {
  return headers["set-cookie"].map((c: string) => c.split("=")[1].split(";")[0])
}
