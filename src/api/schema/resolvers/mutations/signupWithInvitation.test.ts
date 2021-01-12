/** @usePrisma */
import { TestSdk } from "../../../test/TestSdk"
import * as crypto from "../../../utils/crypto"
import * as signupWithInvitation from ".//signupWithInvitation"

jest.spyOn(signupWithInvitation, "onSuccess")

const email1 = "invited1@example.com"
const email2 = "invited2@example.com"
const email3 = "invited3@example.com"
const name = "Invited-user"
const password = "12345678"

const sdk = TestSdk()

describe("Mutation signupWithInvitation", () => {
  describe("Attempted with a non-valid invitation secret", () => {
    it(`returns an error "Could not signin"`, async () => {
      await sdk.SignupWithInvitation({
        name,
        password,
        secret: "invalid",
      })

      const response: any = await sdk.Signin({ email: email1, password })

      expect(response).toMatchObject({
        data: { signin: null },
        errors: [{ message: expect.stringMatching("Could not signin") }],
      })
    })
  })

  describe("Completed with a valid invitation secret", () => {
    it("gives acces to signin", async () => {
      const emailInvitationSecret = crypto.encrypt({
        email: email2,
        isSuperUser: false,
      })

      await sdk.SignupWithInvitation({
        name,
        password,
        secret: emailInvitationSecret,
      })

      const response: any = await sdk.Signin({ email: email2, password })

      expect(response).toMatchObject({
        data: { signin: { email: email2, isSuperUser: false, name } },
      })
    })

    it("allows inviting as superUser", async () => {
      const emailInvitationSecret = crypto.encrypt({
        email: email3,
        isSuperUser: true,
      })

      await sdk.SignupWithInvitation({
        name,
        password,
        secret: emailInvitationSecret,
      })

      const response: any = await sdk.Signin({ email: email3, password })

      expect(response).toMatchObject({
        data: { signin: { email: email3, isSuperUser: true, name } },
      })
    })
  })
})
