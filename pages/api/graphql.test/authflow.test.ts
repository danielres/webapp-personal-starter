/** @usePrisma */

import * as cookies from "./support/cookies"
import client from "./support/client"

describe("auth flow", () => {
  const name = "test-user"
  const email = "test-user@example.com"
  const password = "12345678"

  describe("when previously signed up", () => {
    beforeAll(() => client.signup({ email, name, password }))

    test("signin returns user details + sets signed session cookies", async () => {
      const { body, headers } = await client.signin({ email, password })

      const expected = { name, email, isSuperUser: true }

      expect(body.data.signin).toMatchObject(expected)

      expect(headers["set-cookie"].length).toEqual(2)

      expect(cookies.getNames(headers)).toMatchObject([
        "session",
        "session.sig",
      ])

      cookies.getValues(headers).forEach((value: string) => {
        expect(typeof value).toEqual("string")
        expect(value.length > 0).toBe(true)
      })
    })
  })

  describe("signout ", () => {
    it("deletes session cookies", async () => {
      const { headers } = await client.signout()

      expect(headers["set-cookie"].length).toEqual(2)
      expect(cookies.getNames(headers)).toMatchObject([
        "session",
        "session.sig",
      ])

      headers["set-cookie"].forEach((element: string) =>
        expect(element).toMatch("expires=Thu, 01 Jan 1970")
      )
    })
  })
})
