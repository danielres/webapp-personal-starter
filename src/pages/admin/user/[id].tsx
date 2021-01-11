import { useRouter } from "next/router"
import React from "react"
import { sdk } from "../../../../sdk"
import { FormUser } from "../../../components/admin/forms/FormUser"
import { Card } from "../../../components/ui/Card"
import { Spinner } from "../../../components/ui/Spinner"
import { Stack } from "../../../components/ui/Stack"
import { CardLinkBack } from "../../../components/ui/CardLinkBack"

export default function UserEditAsAdminById() {
  return (
    <Card className="animate-fadein-fast">
      <Stack>
        <CardLinkBack href={"/admin"} />
        <UserEditor />
      </Stack>
    </Card>
  )
}

function UserEditor() {
  const router = useRouter()

  const id = Number(router.query.id)
  const { data } = sdk.useUser({ id })

  if (!data?.user) return <Spinner />

  const onSuccess = () => router.push("/admin")

  return <FormUser user={data.user} onSuccess={onSuccess} />
}
