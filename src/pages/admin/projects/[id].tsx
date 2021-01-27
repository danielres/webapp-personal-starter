import { useRouter } from "next/router"
import { FormProjectEdit } from "../../../components/admin/forms/FormProjectEdit"
import { Button } from "../../../components/ui/Button"
import { Card } from "../../../components/ui/Card"
import { CardLinkBack } from "../../../components/ui/CardLinkBack"
import { Spinner } from "../../../components/ui/Spinner"
import { Stack } from "../../../components/ui/Stack"
import { Project } from "../../../generated/operations"
import { getPath } from "../../../getPath"
import { sdk } from "../../../sdk"

export default function ProjectEditAsAdminById() {
  return (
    <Card className="animate-fadein-fast">
      <Stack>
        <CardLinkBack href={getPath.admin.projects.home()} />
        <ProjectEditor />
      </Stack>
    </Card>
  )
}

function ProjectEditor() {
  const router = useRouter()

  const id = Number(router.query.id)
  const { data, revalidate } = sdk.useProject({ id })

  if (!data?.project) return <Spinner />

  const onDelete = async () => {
    if (!data.project) return

    if (data.project.members.length > 0) {
      alert("Projects with members cannot be deleted.")
      return
    }

    const confirmed = confirm("Are you sure you want to delete this project?")
    if (!confirmed) return

    router.push(getPath.admin.projects.home())
    sdk.ProjectDelete({ id: data.project.id })
  }

  const onSuccess = () => revalidate()

  return (
    <Stack>
      <FormProjectEdit
        project={data.project as Project}
        onSuccess={onSuccess}
      />

      <hr />

      <div className="text-right">
        <Button variant="text" padding="none" onClick={onDelete}>
          Delete project
        </Button>
      </div>
    </Stack>
  )
}
