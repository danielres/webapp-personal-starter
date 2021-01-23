import { useRouter } from "next/router"
import React from "react"
import { sdk } from "../../../../sdk"
import { getPath } from "../../../getPath"
import { FormUser } from "../../../components/admin/forms/FormUser"
import { Card } from "../../../components/ui/Card"
import { CardLinkBack } from "../../../components/ui/CardLinkBack"
import { Spinner } from "../../../components/ui/Spinner"
import { Stack } from "../../../components/ui/Stack"

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

  const onSuccess = () => {
    revalidate()
    router.push(getPath.admin.users.home())
  }

  return <FormUser user={data.user} onSuccess={onSuccess} />
}
