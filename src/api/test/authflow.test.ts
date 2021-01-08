/** @usePrisma */
import { TestSdk } from "./TestSdk"
import * as signup from "../schema/resolvers/mutations/signup"

const sdk = TestSdk()

jest.spyOn(signup, "onSuccess")
jest.spyOn(signup, "onFailure")

const name = "test-user"
const email = "test-user@example.com"
const password = "12345678"

describe("auth flow", () => {
  it("provides signup, signin, signout", async () => {
    const response1: any = await sdk.Me()
    expect(response1.data.me).toEqual(null)

    await sdk.Signup({ email, name, password })

    await sdk.Signin({ email, password })
    const response2: any = await sdk.Me()
    expect(response2.data.me).toMatchObject({ name, email })

    await sdk.Signout()
    const response3: any = await sdk.Me()
    expect(response3.data.me).toEqual(null)

    expect(signup.onSuccess).toHaveBeenCalledWith({
      email,
      name,
      origin: expect.anything(),
    })
  })
})
