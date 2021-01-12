/** @usePrisma */
import { pick } from "../../../../utils/object"
import { TestSdk } from "../../../test/TestSdk"
import * as resendVerificationEmail from "./resendVerificationEmail"

const sdk = TestSdk()

jest.spyOn(resendVerificationEmail, "onSuccess")

const creds = { name: "user", email: "u@example.com", password: "12345678" }
const signinPick = pick(["email", "password"])

describe("Mutation resendVerificationEmail", () => {
  beforeAll(async () => {
    await sdk.Signup(creds)
  })

  describe("When user hasn't signed in", () => {
    it(`returns error "User not found"`, async () => {
      const actual = await sdk.ResendVerificationEmail()

      const expected = {
        data: null,
        errors: [{ message: expect.stringContaining("User not found") }],
      }

      expect(actual).toMatchObject(expected)
    })
  })

  describe("When user has signed in", () => {
    beforeEach(async () => {
      await sdk.Signin(signinPick(creds))
    })

    it(`calls resendVerificationEmail.onSuccess with email + name + origin`, async () => {
      await sdk.ResendVerificationEmail()

      expect(resendVerificationEmail.onSuccess).toHaveBeenCalledWith({
        email: creds.email,
        name: creds.name,
        origin: expect.anything(),
      })
    })
  })
})
