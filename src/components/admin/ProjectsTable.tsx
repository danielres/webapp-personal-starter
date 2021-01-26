import type { Project as PrismaProject } from "@prisma/client"
import Link from "next/link"
import type { ProjectQuery, ProjectsQuery } from "../../generated/operations"
import { getPath } from "../../getPath"
import { Button } from "../ui/Button"
import { TableOuter } from "../ui/TableOuter"
import { Time } from "../ui/Time"

type ProjectsTableProps = {
  onFieldClick: (fieldName: string) => void
  projects: ProjectsQuery["projects"]
}

type ProjectTableHeaders = {
  field: keyof PrismaProject | null
  label: string | null
}[]

export function ProjectsTable({ onFieldClick, projects }: ProjectsTableProps) {
  const headers: ProjectTableHeaders = [
    { field: "id", label: null },
    { field: "name", label: "name" },
    { field: "ownerId", label: "owner" },
    { field: "createdAt", label: "created" },
    { field: "updatedAt", label: "updated" },
    { field: null, label: null },
  ]

  return (
    <TableOuter headers={headers} onFieldClick={onFieldClick}>
      {projects.map(
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
