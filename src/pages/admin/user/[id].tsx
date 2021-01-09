import { useRouter } from "next/router"
import { sdk } from "../../../../sdk"
import { FormUser } from "../../../components/admin/forms/FormUser"
import { Card } from "../../../components/ui/Card"

export default function UserEditAsAdminById() {
  return (
    <Card className="animate-fadein-fast">
      <UserEditor />
    </Card>
  )
}

function UserEditor() {
  const router = useRouter()

  const id = Number(router.query.id)
  const { data } = sdk.useUser({ id })

  if (!data?.user) return null

  const onSuccess = () => router.push("/admin")

  return <FormUser user={data.user} onSuccess={onSuccess} />
}
