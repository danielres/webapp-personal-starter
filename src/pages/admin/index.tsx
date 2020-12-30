import React from "react"
import { SuperUserOnly } from "../../components/SuperUserOnly"
import { UsersTable } from "../../components/admin/UsersTable"

export default function Admin() {
  return (
    <SuperUserOnly silent={false}>
      <div>
        <h2>Admin</h2>

        <h2>Users</h2>
        <UsersTable />
      </div>
    </SuperUserOnly>
  )
}
