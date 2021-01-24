import Link from "next/link"
import React from "react"
import { sdk } from "../../sdk"
import type { ProjectQuery } from "../../generated/operations"
import { getPath } from "../../getPath"
import { Button } from "../ui/Button"
import { TableOuter } from "../ui/TableOuter"
import { Time } from "../ui/Time"

export function ProjectsTable() {
  const { data, error } = sdk.useProjects()

  if (error) return <div>{error.message}</div>

  const headers = ["", "name", "owner", "created", "updated", ""]

  return (
    <TableOuter headers={headers}>
      {data?.projects.map(
        (project) =>
          project && (
            <RowProject
              key={project.id}
              project={project as ProjectQuery["project"]}
            />
          )
      )}
    </TableOuter>
  )
}

function RowProject({ project }: { project: ProjectQuery["project"] }) {
  if (!project) return null

  return (
    <tr>
      <td
        className="w-1 font-mono text-sm text-right text-gray-400"
        title="Project id"
      >
        <div className="pr-4">{project.id}</div>
      </td>
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
