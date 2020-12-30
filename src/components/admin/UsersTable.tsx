import React from "react"
import { sdk } from "../../../sdk"
import { User as TUser } from "../../generated/operations"

export function UsersTable() {
  const { data, error } = sdk.useUsers()

  if (error) return <div>{error.message}</div>

  if (!data?.users) return <div>Loading...</div>

  return (
    <table width="100%">
      <thead>
        <th>id</th>
        <th>name</th>
        <th>email</th>
        <th>isSuperUser</th>
        <th>created at</th>
        <th>updated at</th>
      </thead>
      <tbody>{data.users.map((user) => user && <UserRow user={user} />)}</tbody>
    </table>
  )
}

function UserRow({ user }: { user: TUser }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.isSuperUser.toString()}</td>
      <td>{user.createdAt}</td>
      <td>{user.updatedAt}</td>
    </tr>
  )
}
