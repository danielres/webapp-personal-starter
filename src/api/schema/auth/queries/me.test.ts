/** @usePrisma */
import { TestSdk } from "../../../test/TestSdk"

const name = "test-user"
const email = "test-user@example.com"
const password = "12345678"

describe("Query me", () => {
  describe("When not signed in", () => {
    const sdk = TestSdk()

    it(`returns null"`, async () => {
      const response: any = await sdk.Me()

      expect(response.data.me).toEqual(null)
    })
  })

  describe("When signed in", () => {
    const sdk = TestSdk()

    beforeAll(async () => {
      await sdk.Signup({ email, name, password })
      await sdk.Signin({ email, password })
    })

    it("returns my data", async () => {
      const response: any = await sdk.Me()
      const expected = { name, email }

      expect(response.data.me).toMatchObject(expected)
    })
  })
})
