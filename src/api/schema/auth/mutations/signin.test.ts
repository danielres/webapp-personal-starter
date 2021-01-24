/** @usePrisma */
import { TestSdk } from "../../../test/TestSdk"

const sdk = TestSdk()

describe("Mutation signin", () => {
  describe("Validations", () => {
    it("requires valid email + password", async () => {
      const res: any = await sdk.Signin({ email: "X", password: "X" })

      expect(res.data.signin).toEqual(null)
      expect(res.errors[0].extensions.exception.message).toMatch(
        "Validation errors"
      )
      expect(res.errors[0].extensions.exception.messages).toMatchObject([
        "email: should be a valid email",
        "password: should be between 8 and 256 characters",
      ])
    })
  })
})
