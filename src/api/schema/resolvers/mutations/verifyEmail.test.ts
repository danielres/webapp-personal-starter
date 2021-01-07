/** @usePrisma */
import { pick } from "../../../../utils/object"
import { TestSdk } from "../../../test/TestSdk"
import * as crypto from "../../../utils/crypto"

const sdk = TestSdk()

const creds1 = { name: "user1", email: "u1@example.com", password: "12345678" }
const creds2 = { name: "user2", email: "u2@example.com", password: "12345678" }
const signinPick = pick(["email", "password"])

describe("Mutation verifyEmail", () => {
  describe("When email already exists", () => {
    beforeEach(async () => {
      await sdk.Signup(creds1) // first user in db gets automatically verified
      await sdk.Signup(creds2)
    })

    test("sets the value of emailVerifiedAt", async () => {
      const res1: any = await sdk.Signin(signinPick(creds2))
      expect(res1.data.signin.emailVerifiedAt).toBe(null)

      const { email, name } = res1.data.signin
      const emailVerificationSecret = crypto.encrypt({ email })

      const res2: any = await sdk.VerifyEmail({ emailVerificationSecret })
      expect(res2.data.verifyEmail).toMatchObject({ email, name })

      const res3: any = await sdk.Signin(signinPick(creds2))
      expect(res3.data.signin.emailVerifiedAt).not.toBe(null)
    })
  })
})
