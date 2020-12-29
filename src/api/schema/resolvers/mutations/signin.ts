import bcrypt from "bcrypt"
import { Context } from "../../../context"
import { SigninError } from "../../../errors/SigninError"

type SigninArgs = {
  email: string
  password: string
}

export const signin = async (
  _: unused,
  args: SigninArgs,
  { prisma, req }: Context
) => {
  const user = await prisma.user.findUnique({ where: { email: args.email } })
  if (!user) return new SigninError()

  const isValidPassword = await bcrypt.compare(args.password, user.password)
  if (!isValidPassword) return new SigninError()

  if (req.session) {
    const { id } = user
    req.session.user = { id }
  }

  return user
}
