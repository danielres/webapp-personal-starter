import React from "react"
import { UsersTable } from "../../components/admin/UsersTable"
import { Card } from "../../components/ui/Card"

export default function Admin() {
  return (
    <Card className="animate-fadein-fast">
      <UsersTable />
    </Card>
  )
}
