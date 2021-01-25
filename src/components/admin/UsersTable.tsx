import type { User as PrismaUser } from "@prisma/client"
import Link from "next/link"
import type { User, UsersQuery } from "../../generated/operations"
import { getPath } from "../../getPath"
import { Button } from "../ui/Button"
import { TableOuter } from "../ui/TableOuter"
import { Time } from "../ui/Time"

type UsersTableProps = {
  onFieldClick: (fieldName: string) => void
  users: UsersQuery["users"]
}

type UserTableHeaders = {
  field: keyof PrismaUser | null
  label: string | null
}[]

export function UsersTable({ onFieldClick, users }: UsersTableProps) {
  const headers: UserTableHeaders = [
    { field: "id", label: null },
    { field: "name", label: "name" },
    { field: "email", label: "email" },
    { field: "isSuperUser", label: "superuser" },
    { field: "approvedById", label: "approved" },
    { field: "createdAt", label: "created" },
    { field: "updatedAt", label: "updated" },
    { field: null, label: null },
  ]

  return (
    <TableOuter headers={headers} onFieldClick={onFieldClick}>
      {users?.map((user) => user && <RowUser key={user.id} user={user} />)}
    </TableOuter>
  )
}

function RowUser({ user }: { user: User }) {
  return (
    <tr>
      <td
        className="font-mono text-sm text-right text-gray-400"
        title="User id"
      >
        <div className="pr-4">{user.id}</div>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.isSuperUser.toString()}</td>
      <td>{user.isApproved.toString()}</td>
      <td>
        <Time time={user.createdAt} />
      </td>
      <td>
        {user.createdAt !== user.updatedAt && <Time time={user.updatedAt} />}
      </td>
      <td>
        <Link href={getPath.admin.users.edit(user.id)} passHref>
          <Button as="a" variant="text" padding="none">
            edit
          </Button>
        </Link>
      </td>
    </tr>
  )
}
