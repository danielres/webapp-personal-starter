/** @usePrisma */
import { JestGlobal } from "../../../../../jest/types"
import { getEmailInvitationSecret } from "../../../emails/senders/getEmailInvitationSecret"
import { TestSdk } from "../../../test/TestSdk"
import * as object from "../../../utils/object"
import * as signupWithInvitation from ".//signupWithInvitation"

declare const global: JestGlobal
const { prisma } = global

jest.spyOn(signupWithInvitation, "onSuccess")

const email1 = "invited1@example.com"
const email2 = "invited2@example.com"
const email3 = "invited3@example.com"
const name = "Invited-user"
const password = "12345678"

const adminCreds = {
  email: "admin@example.com",
  name: "admin",
  password: "12345678",
}

const sdk = TestSdk()

let adminUserId: number

describe("Mutation signupWithInvitation", () => {
  beforeAll(async () => {
    await sdk.Signup(adminCreds)
    const adminUser = await prisma.user.findUnique({
      where: { email: "admin@example.com" },
    })
    if (!adminUser) throw new Error("Test error: failed to create adminUser")
    adminUserId = adminUser.id
  })

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
      const emailInvitationSecret = getEmailInvitationSecret({
        email: email2,
        isSuperUser: false,
        invitedById: adminUserId,
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
      const emailInvitationSecret = getEmailInvitationSecret({
        email: email3,
        isSuperUser: true,
        invitedById: adminUserId,
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
