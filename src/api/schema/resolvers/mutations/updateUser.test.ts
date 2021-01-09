/** @usePrisma */
import { JestGlobal } from "../../../../../jest/types"
import { pick } from "../../../../utils/object"
import { TestSdk } from "../../../test/TestSdk"

declare const global: JestGlobal
const { prisma } = global

const creds0 = { name: "user0", email: "u0@example.com", password: "12345678" }
const creds1 = { name: "user1", email: "u1@example.com", password: "12345678" }
const creds2 = { name: "user2", email: "u2@example.com", password: "12345678" }
const signinPick = pick(["email", "password"])

const sdks = {
  anon: TestSdk(),
  user: TestSdk(),
  superUser: TestSdk(),
}

let id: any

beforeEach(async () => {
  await sdks.superUser.Signup(creds1)
  await sdks.superUser.Signin(signinPick(creds1))

  await sdks.user.Signup(creds2)
  await sdks.user.Signin(signinPick(creds2))

  id = (await prisma.user.create({ data: creds0 })).id
})

describe("Mutation updateUser", () => {
  it(`works, but for superUsers only`, async () => {
    const res1: any = await sdks.anon.UpdateUser({ id, name: "updated" })
    expect(res1.data.updateUser === null).toBe(true)
    expect(res1.errors[0].message).toMatch("Not Authorised!")

    const res2: any = await sdks.user.UpdateUser({ id, name: "updated" })
    expect(res2.data.updateUser === null).toBe(true)
    expect(res2.errors[0].message).toMatch("Not Authorised!")

    const res3: any = await sdks.superUser.UpdateUser({ id, name: "updated" })
    expect(res3.data.updateUser).toMatchObject({ id, name: "updated" })
    expect(res3.errors === undefined).toBe(true)
  })
})
