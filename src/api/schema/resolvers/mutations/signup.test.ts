/** @usePrisma */
import { pick } from "../../../../utils/object"
import { TestSdk } from "../../../test/TestSdk"
import { sendEmail } from "../mutations/sendEmail"
;(sendEmail as any) = jest.fn()

const sdk = TestSdk()

describe("Mutation Signup", () => {
  const creds1 = { name: "u1", email: "u1@example.com", password: "12345678" }
  const creds2 = { name: "u2", email: "u2@example.com", password: "12345678" }
  const signinPick = pick(["email", "password"])

  it("makes first user superUser", async () => {
    await sdk.Signup(creds1)
    await sdk.Signup(creds2)

    const res1: any = await sdk.Signin(signinPick(creds1))
    const res2: any = await sdk.Signin(signinPick(creds2))

    expect(res1.data.signin.isSuperUser).toEqual(true)
    expect(res2.data.signin.isSuperUser).toEqual(false)
  })
})
