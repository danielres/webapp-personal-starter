/** @usePrisma */
import { pick } from "../../../../utils/object"
import { TestSdk } from "../../../test/TestSdk"
import * as inviteByEmail from "./inviteByEmail"

const sdk = TestSdk()

jest.spyOn(inviteByEmail, "onSuccess")

const creds = { name: "user", email: "u@example.com", password: "12345678" }
const signinPick = pick(["email", "password"])

const variables = { email: "invited@example.com" }

describe("Mutation inviteByEmail", () => {
  describe("When user hasn't signed in", () => {
    it(`returns error "Not Authorised"`, async () => {
      const actual = await sdk.InviteByEmail(variables)

      const expected = {
        data: null,
        errors: [{ message: expect.stringContaining("Not Authorised") }],
      }

      expect(actual).toMatchObject(expected)
    })
  })

  describe("When user has signed in", () => {
    beforeEach(async () => {
      await sdk.Signup(creds)
      await sdk.Signin(signinPick(creds))
    })

    it(`calls inviteByEmail.onSuccess with email + by + origin + isSuperUser`, async () => {
      await sdk.InviteByEmail(variables)

      expect(inviteByEmail.onSuccess).toHaveBeenCalledWith({
        email: variables.email,
        invitedBy: expect.objectContaining({
          email: creds.email,
          name: creds.name,
        }),
        origin: expect.anything(),
        isSuperUser: false,
      })
    })
  })
})
