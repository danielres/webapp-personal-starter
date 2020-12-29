import bcrypt from "bcrypt"
import { Context } from "../../../context"

type SigninArgs = {
  email: string
  password: string
}

export const signin = async (
  _: unused,
  args: SigninArgs,
  { prisma, req }: Context
) => {
  const signinError = new Error("Invalid credentials.")

  const user = await prisma.user.findUnique({ where: { email: args.email } })
  if (!user) throw signinError

  const isValidPassword = await bcrypt.compare(args.password, user.password)
  if (!isValidPassword) throw signinError

  if (req.session) {
    const { id } = user
    req.session.user = { id }
  }

  return user
}
