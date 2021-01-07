/** @usePrisma */
import { pick } from "../../../../utils/object"
import { TestSdk } from "../../../test/TestSdk"
import * as signup from "./signup"

const sdk = TestSdk()

jest.spyOn(signup, "onSuccess")
jest.spyOn(signup, "onFailure")

const creds1 = { name: "user1", email: "u1@example.com", password: "12345678" }
const creds2 = { name: "user2", email: "u2@example.com", password: "12345678" }
const signinPick = pick(["email", "password"])

describe("Mutation signup", () => {
  describe("Validations", () => {
    it("requires valid email + name + password", async () => {
      const res: any = await sdk.Signup({
        email: "X",
        name: "X",
        password: "X",
      })

      expect(res.data).toEqual(null)
      expect(res.errors[0].extensions.exception.message).toMatch(
        "Validation errors"
      )
      expect(res.errors[0].extensions.exception.messages).toMatchObject([
        "email: should be a valid email",
        "name: should be between 3 and 64 characters",
        "password: should be between 8 and 64 characters",
      ])
    })
  })

  describe("When email already exists", () => {
    beforeEach(async () => {
      await sdk.Signup(creds1)
    })

    it("calls signup.onFailure() with email + reason + origin", async () => {
      await sdk.Signup(creds1)

      const email = creds1.email
      const reason = "EMAIL_EXISTS"
      expect(signup.onFailure).toHaveBeenCalledWith({
        email,
        reason,
        origin: expect.anything(),
      })
    })
  })

  describe("On success", () => {
    it("makes first user superUser", async () => {
      await sdk.Signup(creds1)
      await sdk.Signup(creds2)

      const res1: any = await sdk.Signin(signinPick(creds1))
      const res2: any = await sdk.Signin(signinPick(creds2))

      expect(res1.data.signin.isSuperUser).toEqual(true)
      expect(res2.data.signin.isSuperUser).toEqual(false)
    })

    it("calls signup.onSucces() with email + name + origin", async () => {
      await sdk.Signup(creds1)
      const email = creds1.email
      const name = creds1.name
      expect(signup.onSuccess).toHaveBeenCalledWith({
        email,
        name,
        origin: expect.anything(),
      })
    })
  })
})
