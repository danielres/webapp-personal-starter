import bcrypt from "bcrypt"
import { Context } from "../../../context"
import * as config from "../../../../../config"

type SignupArgs = { email: string; name: string; password: string }

export const signup = async (
  _: unused,
  args: SignupArgs,
  { prisma }: Context
) => {
  const { password, ...rest } = args
  const usersCount = await prisma.user.count()
  const isSuperUser = usersCount === 0
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounts)

  return prisma.user.create({
    data: {
      ...rest,
      isSuperUser,
      password: hashedPassword,
    },
  })
}
