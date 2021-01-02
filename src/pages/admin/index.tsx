import React from "react"
import { UsersTable } from "../../components/admin/UsersTable"
import { SuperUserOnly } from "../../components/SuperUserOnly"
import { H2 } from "../../components/ui/H2"

export default function Admin() {
  return (
    <SuperUserOnly silent={false}>
      <H2>Users</H2>
      <UsersTable />
    </SuperUserOnly>
  )
}
