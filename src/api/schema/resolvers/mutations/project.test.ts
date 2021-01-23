/** @usePrisma */
import { JestGlobal } from "../../../../../jest/types"
import { pick } from "../../../../utils/object"
import { TestSdk } from "../../../test/TestSdk"

declare const global: JestGlobal
const { prisma } = global

const creds1 = { name: "user1", email: "u1@example.com", password: "12345678" }
const signinPick = pick(["email", "password"])

const projectData = { name: "Project-1" }
const member1Data = { name: "M1", email: "m1@example.com", password: "xxx" }
const member2Data = { name: "M2", email: "m2@example.com", password: "xxx" }

const sdk = TestSdk()

beforeEach(async () => {
  await sdk.Signup(creds1)
  await sdk.Signin(signinPick(creds1))
})

describe("Project create + update flow", () => {
  it(`creates a project, updates its name and members list`, async () => {
    const member1 = await prisma.user.create({ data: member1Data })
    const member2 = await prisma.user.create({ data: member2Data })

    const res1: any = await sdk.ProjectCreate(projectData)
    expect(res1.data.projectCreate).toMatchObject({ name: "Project-1" })

    const id = res1.data.projectCreate.id

    const newMemberIds = [member1.id, member2.id]
    await sdk.ProjectUpdate({ id, newMemberIds, name: "Project-1.1" })

    const res3: any = await sdk.Project({ id })
    expect(res3.data.project.name).toEqual("Project-1.1")
    expect(res3.data.project.members.length).toEqual(2)

    await sdk.ProjectUpdate({ id, removedMemberIds: [member2.id] })
    const res4: any = await sdk.Project({ id })
    expect(res4.data.project.members.length).toEqual(1)
  })
})
