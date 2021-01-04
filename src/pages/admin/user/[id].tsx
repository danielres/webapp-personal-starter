import { useRouter } from "next/router"
import React from "react"
import { Card } from "src/components/ui/Card"
import { UserEditor } from "../../../components/admin/UserEditor"
import { SuperUserOnly } from "../../../components/SuperUserOnly"

export default function UserEditAsAdminById() {
  const { query } = useRouter()

  if (!query?.id) return <div>Loading</div>

  const id = Number(query.id)

  return (
    <SuperUserOnly silent={false}>
      <Card>
        <UserEditor id={id} />
      </Card>
    </SuperUserOnly>
  )
}
