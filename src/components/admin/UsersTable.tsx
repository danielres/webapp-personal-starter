import Link from "next/link"
import React from "react"
import { sdk } from "../../../sdk"
import { User as TUser } from "../../generated/operations"
import { Button } from "../ui/Button"
import { TableOuter } from "../ui/TableOuter"
import { Time } from "../ui/Time"

export function UsersTable() {
  const { data, error } = sdk.useUsers()

  if (error) return <div>{error.message}</div>

  if (!data?.users) return <div>Loading...</div>

  const headers = [
    "id",
    "name",
    "email",
    "Superuser",
    "created at",
    "updated at",
    "actions",
  ]

  return (
    <TableOuter headers={headers}>
      {data.users.map((user) => user && <RowUser key={user.id} user={user} />)}
    </TableOuter>
  )
}

function RowUser({ user }: { user: TUser }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.isSuperUser.toString()}</td>
      <td>
        <Time time={user.createdAt} />
      </td>
      <td>
        {user.createdAt !== user.updatedAt && <Time time={user.updatedAt} />}
      </td>
      <td>
        <Link href={`/admin/user/${user.id}`} passHref>
          <Button as="a" variant="action">
            edit
          </Button>
        </Link>
      </td>
    </tr>
  )
}
