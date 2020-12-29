import { Context } from "../../../context"
import { ForbiddenError } from "../../../errors/ForbiddenError"

export const me = async (_: unused, __: unused, { req, prisma }: Context) => {
  const id = req?.session?.user?.id
  if (!id) throw new ForbiddenError()
  const me = await prisma.user.findUnique({ where: { id } })
  return me
}
