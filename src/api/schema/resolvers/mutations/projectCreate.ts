import type { ProjectCreateMutationVariables } from "../../../../generated/operations"
import { ProjectCreateInput, validate } from "../../../../validators/structs"
import type { Context } from "../../../context"
import { ValidationErrors } from "../../../errors/InputValidationError"
import { NotAuthenticatedError } from "../../../errors/NotAuthenticatedError"

export const projectCreate = async (
  _: unused,
  args: ProjectCreateMutationVariables,
  { me, prisma }: Context
) => {
  try {
    if (!me) return new NotAuthenticatedError()

    const [error] = validate(args, ProjectCreateInput)
    if (error) return new ValidationErrors(error.failures())

    const ownerId = me.id
    const project = await prisma.project.create({ data: { ...args, ownerId } })

    return project
  } catch (error) {
    return error
  }
}
