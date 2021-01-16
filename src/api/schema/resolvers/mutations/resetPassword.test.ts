/** @usePrisma */
import * as emailSender from "../../../emails/senders/sendEmailResetPasswordBegin"
import { TestSdk } from "../../../test/TestSdk"
import * as resetPasswordBegin from "./resetPassword.begin"
import * as resetPasswordFinish from "./resetPassword.finish"

const sdk = TestSdk()

jest.spyOn(resetPasswordBegin, "onSuccess")
jest.spyOn(resetPasswordFinish, "onSuccess")
const getMessageSpy = jest.spyOn(emailSender, "getMessage")

const creds = { name: "user", email: "u@example.com", password: "12345678" }
const newPassword = "new-12345678"

describe("ResetPassword flow", () => {
  describe("Mutations resetPasswordBegin + resetPasswordFinish", () => {
    beforeAll(async () => {
      await sdk.Signup(creds)
    })

    it("allows to sign in using the new password", async () => {
      const res1: any = await sdk.Signin({
        email: creds.email,
        password: newPassword,
      })

      expect(res1).toMatchObject({
        data: { signin: null },
        errors: [
          {
            message: expect.stringContaining("invalid credentials"),
          },
        ],
      })

      await sdk.ResetPasswordBegin({
        email: creds.email,
        password: newPassword,
      })

      expect(resetPasswordBegin.onSuccess).toHaveBeenCalledWith({
        email: creds.email,
        password: newPassword,
        origin: expect.anything(),
      })

      const { secretLink } = getMessageSpy.mock.calls[0][0]
      const secret = secretLink.split("?secret=")[1]

      await sdk.ResetPasswordFinish({ secret })

      expect(resetPasswordFinish.onSuccess).toHaveBeenCalled()

      const res2: any = await sdk.Signin({
        email: creds.email,
        password: newPassword,
      })

      expect(res2.data.signin).toMatchObject({
        name: creds.name,
        email: creds.email,
      })
    })
  })
})
