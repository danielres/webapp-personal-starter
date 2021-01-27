import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"
import { FormUser } from "../../../components/admin/forms/FormUser"
import { Button } from "../../../components/ui/Button"
import { Card } from "../../../components/ui/Card"
import { CardLinkBack } from "../../../components/ui/CardLinkBack"
import { Spinner } from "../../../components/ui/Spinner"
import { Stack } from "../../../components/ui/Stack"
import { DeleteSuccessMessage } from "../../../components/ui/toasts/DeleteSuccessMessage"
import { getPath } from "../../../getPath"
import { sdk } from "../../../sdk"

export default function UserEditAsAdminById() {
  return (
    <Card className="animate-fadein-fast">
      <Stack>
        <CardLinkBack href={getPath.admin.users.home()} />
        <UserEditor />
      </Stack>
    </Card>
  )
}

function UserEditor() {
  const router = useRouter()

  const id = Number(router.query.id)
  const { data, revalidate } = sdk.useUser({ id })

  if (!data?.user) return <Spinner />

  const onDelete = async () => {
    if (!data.user) return

    const confirmed = confirm("Are you sure you want to delete this user?")
    if (!confirmed) return

    router.push(getPath.admin.users.home())

    await sdk.UserDelete({ id: data.user.id })
    toast(<DeleteSuccessMessage name={data.user.name} />)
  }

  const onSuccess = () => {
    revalidate()
    router.push(getPath.admin.users.home())
  }

  return (
    <Stack>
      <FormUser user={data.user} onSuccess={onSuccess} />
      <hr />

      <div className="text-right">
        <Button variant="text" padding="none" onClick={onDelete}>
          Delete user
        </Button>
      </div>
    </Stack>
  )
}
