/** @usePrisma */
import { JestGlobal } from "../../../../../jest/types"
import * as password from "../../../../utils/password"
import { TestSdk } from "../../../test/TestSdk"

declare const global: JestGlobal
const { prisma } = global

const sdks = {
  owneruser: TestSdk(),
  superuser: TestSdk(),
  user: TestSdk(),
}

describe("Project delete", () => {
  it(`is allowed for superusers and owners only, returns the project's name`, async () => {
    const owneruserData = {
      name: "owneruser",
      email: "ou@ex.com",
      password: await password.hash("12345678"),
      isSuperUser: false,
    }
    const superuserData = {
      name: "superuser",
      email: "su@ex.com",
      password: await password.hash("12345678"),
      isSuperUser: true,
    }
    const userData = {
      name: "user",
      email: "u@ex.com",
      password: await password.hash("12345678"),
      isSuperUser: false,
    }

    const owneruser = await prisma.user.create({ data: owneruserData })
    await prisma.user.create({ data: superuserData })
    await prisma.user.create({ data: userData })

    const project1 = await prisma.project.create({
      data: { name: "P1", ownerId: owneruser.id },
    })
    const project2 = await prisma.project.create({
      data: { name: "P2", ownerId: owneruser.id },
    })
    const project3 = await prisma.project.create({
      data: { name: "P3", ownerId: owneruser.id },
    })

    await sdks.owneruser.Signin({ email: "ou@ex.com", password: "12345678" })
    await sdks.superuser.Signin({ email: "su@ex.com", password: "12345678" })
    await sdks.user.Signin({ email: "u@ex.com", password: "12345678" })

    expect(await prisma.project.count()).toEqual(3)

    const res1: any = await sdks.owneruser.ProjectDelete({ id: project1.id })
    expect(res1.data.projectDelete.name).toEqual("P1")
    expect(await prisma.project.count()).toEqual(2)

    const res2: any = await sdks.superuser.ProjectDelete({ id: project2.id })
    expect(res2.data.projectDelete.name).toEqual("P2")
    expect(await prisma.project.count()).toEqual(1)

    const res3: any = await sdks.user.ProjectDelete({ id: project3.id })
    expect(res3.data.projectDelete).toEqual(null)
    expect(res3.errors).toMatchObject([
      { message: expect.stringContaining("Not Authorised") },
    ])
    expect(await prisma.project.count()).toEqual(1)
  })
})
