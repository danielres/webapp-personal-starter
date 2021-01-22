import { useRouter } from "next/router"
import { sdk } from "../../../../sdk"
import { FormProjectEdit } from "../../../components/admin/forms/FormProjectEdit"
import { Card } from "../../../components/ui/Card"
import { CardLinkBack } from "../../../components/ui/CardLinkBack"
import { Spinner } from "../../../components/ui/Spinner"
import { Stack } from "../../../components/ui/Stack"
import { Project } from "../../../generated/operations"
import { getPath } from "../../../getPath"

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

  const onSuccess = () => revalidate()

  return (
    <FormProjectEdit project={data.project as Project} onSuccess={onSuccess} />
  )
}
