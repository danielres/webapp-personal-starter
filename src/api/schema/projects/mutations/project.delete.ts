import type { ProjectDeleteMutationVariables } from "../../../../generated/operations"
import type { Context } from "../../../context"

export const projectDelete = async (
  _: unused,
  args: ProjectDeleteMutationVariables,
  { prisma }: Context
) => {
  try {
    return await prisma.project.delete({ where: { id: args.id } })
  } catch (error) {
    return error
  }
}
