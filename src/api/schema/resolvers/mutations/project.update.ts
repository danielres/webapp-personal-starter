import type { ProjectUpdateMutationVariables } from "../../../../generated/operations"
import { ProjectUpdateInput, validate } from "../../../../validators/structs"
import type { Context } from "../../../context"
import * as codes from "../../../errors/codes"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { NotAuthenticatedError } from "../../../errors/NotAuthenticatedError"
import { ServerError } from "../../../errors/ServerError"

export const projectUpdate = async (
  _: unused,
  args: ProjectUpdateMutationVariables,
  { me, prisma }: Context
) => {
  if (!me) return new NotAuthenticatedError()

  const [error] = validate(args, ProjectUpdateInput)
  if (error) return new ValidationErrors(error.failures())

  const name = args.name ?? undefined
  const newMemberIds = (args.newMemberIds ?? []) as any[]
  const removedMemberIds = (args.removedMemberIds ?? []) as any[]

  try {
    const updated = await prisma.project.update({
      where: { id: args.id },
      data: {
        name,
        members: {
          connect: newMemberIds.map((id) => ({ id })),
          disconnect: removedMemberIds.map((id) => ({ id })),
        },
      },
      include: { members: true },
    })

    return updated
  } catch (error) {
    const nameExists =
      error.code === codes.prisma.UNIQUE_VALIDATION_FAILURE &&
      error.meta?.target?.includes("name")

    if (nameExists)
      return new ServerError({
        message: `The name "${name}" is already used by another project.`,
        report: false,
      })

    return error
  }
}
