import Link from "next/link"
import React from "react"
import { sdk } from "../../../sdk"
import { getPath } from "../../getPath"
import type { Project } from "../../generated/operations"
import { Button } from "../ui/Button"
import { TableOuter } from "../ui/TableOuter"
import { Time } from "../ui/Time"

export function ProjectsTable() {
  const { data, error } = sdk.useProjects()

  if (error) return <div>{error.message}</div>

  const headers = ["id", "name", "owner", "created", "updated", ""]

  return (
    <TableOuter headers={headers}>
      {data?.projects.map(
        (project) =>
          project && <RowProject key={project.id} project={project} />
      )}
    </TableOuter>
  )
}

function RowProject({ project }: { project: Project }) {
  return (
    <tr>
      <td>{project.id}</td>
      <td>{project.name}</td>
      <td>
        <Link href={getPath.admin.users.edit(project.owner.id)} passHref>
          <Button as="a" variant="text" padding="none">
            {project.owner.name}
          </Button>
        </Link>
      </td>
      <td>
        <Time time={project.createdAt} />
      </td>
      <td>
        {project.createdAt !== project.updatedAt && (
          <Time time={project.updatedAt} />
        )}
      </td>
      <td>
        <Link href={getPath.admin.projects.edit(project.id)} passHref>
          <Button as="a" variant="text" padding="none">
            edit
          </Button>
        </Link>
      </td>
    </tr>
  )
}
