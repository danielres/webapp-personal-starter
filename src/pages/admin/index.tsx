import React from "react"
import { UsersTable } from "../../components/admin/UsersTable"
import { SuperUserOnly } from "../../components/SuperUserOnly"
import { Card } from "../../components/ui/Card"

export default function Admin() {
  return (
    <SuperUserOnly silent={false}>
      <Card className="animate-fadein-fast">
        <UsersTable />
      </Card>
    </SuperUserOnly>
  )
}
