import bcrypt from "bcrypt"
import { SigninMutationVariables } from "../../../../generated/operations"
import { SigninInput, validate } from "../../../../validators/structs"
import { Context } from "../../../context"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { SigninError } from "../../../errors/SigninError"

export const signin = async (
  _: unused,
  args: SigninMutationVariables,
  { prisma, req }: Context
) => {
  const [error] = validate(args, SigninInput)
  if (error) return new ValidationErrors(error.failures())

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
