/** @usePrisma */
import { sendEmail } from "../schema/resolvers/mutations/sendEmail"
import { TestSdk } from "./TestSdk"

const name = "test-user"
const email = "test-user@example.com"
const password = "12345678"

;(sendEmail as any) = jest.fn()

const sdk = TestSdk()

describe("auth flow", () => {
  it("provides signup, signin, signout", async () => {
    expect.assertions(5)

    const response1: any = await sdk.Me()
    expect(response1.data.me).toEqual(null)

    await sdk.Signup({ email, name, password })

    await sdk.Signin({ email, password })
    const response2: any = await sdk.Me()
    expect(response2.data.me).toMatchObject({ name, email })

    await sdk.Signout()
    const response3: any = await sdk.Me()
    expect(response3.data.me).toEqual(null)

    expect(sendEmail).toHaveBeenCalledTimes(1)
    expect(sendEmail).toHaveBeenCalledWith(expect.anything(), {
      email,
    })
  })
})
