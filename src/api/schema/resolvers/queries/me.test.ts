/** @usePrisma */
import { TestSdk } from "../../../test/TestSdk"
import { sendEmail } from "../mutations/sendEmail"

const name = "test-user"
const email = "test-user@example.com"
const password = "12345678"

;(sendEmail as any) = jest.fn()

describe("Query me", () => {
  describe("When not signed in", () => {
    const sdk = TestSdk()

    it(`returns no data but error "Not Authorised!"`, async () => {
      const response: any = await sdk.Me()

      expect(response.data.me).toEqual(null)
      expect(response.errors[0].message).toMatch("Not Authorised!")
    })
  })

  describe("When signed in", () => {
    const sdk = TestSdk()

    beforeAll(async () => {
      await sdk.Signup({ email, name, password })
      await sdk.Signin({ email, password })
    })

    test("returns my data", async () => {
      const response: any = await sdk.Me()
      const expected = { name, email }

      expect(response.data.me).toMatchObject(expected)
    })
  })
})
