import React from "react"
import { Card } from "src/components/ui/Card"
import { UsersTable } from "../../components/admin/UsersTable"
import { SuperUserOnly } from "../../components/SuperUserOnly"

export default function Admin() {
  return (
    <SuperUserOnly silent={false}>
      <Card className="animate-fadein-fast">
        <UsersTable />
      </Card>
    </SuperUserOnly>
  )
}
