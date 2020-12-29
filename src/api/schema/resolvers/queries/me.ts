import { Context } from "../../../context"

export const me = async (_: unused, __: unused, { req, prisma }: Context) =>
  prisma.user.findUnique({ where: { id: req.session?.user?.id } })
