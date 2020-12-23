import { Context, unused } from "../types"

export const signup = async (
  _: unused,
  args: { email: string; name: string; password: string },
  { prisma }: Context
) => prisma.user.create({ data: args })
