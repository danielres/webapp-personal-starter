import React, { useState } from "react"
import * as config from "../../../config"
import { FormInviteByEmail } from "../../components/admin/forms/FormInviteByEmail"
import { UsersTable } from "../../components/admin/UsersTable"
import { InlineIcon } from "../../components/Icons/InlineIcon"
import { PlusCircle } from "../../components/Icons/PlusCircle"
import { Card } from "../../components/ui/Card"
import { CardLinkBack } from "../../components/ui/CardLinkBack"
import { H2 } from "../../components/ui/H2"
import { Pagination } from "../../components/ui/Pagination"
import { Stack } from "../../components/ui/Stack"
import { sdk } from "../../sdk"

const perPage = config.pagination.perPage.default

export default function Admin() {
  const [isInviteActive, setIsInviteActive] = useState(false)
  const [page, setPage] = useState(0)

  const [orderBy, setOrderBy] = useState("name")
  const [isAsc, setIsAsc] = useState(true)

  const onFieldClick = (field: string) => {
    setOrderBy(field)
    if (field === orderBy) setIsAsc(!isAsc)
  }

  const { data, error } = sdk.useUsers({
    skip: page * perPage,
    take: perPage,
    orderBy,
    orderDirection: isAsc ? "asc" : "desc",
  })

  if (error) return <div>{error.message}</div> // FIXME

  return (
    <Card className="animate-fadein-fast">
      <Stack>
        {isInviteActive && (
          <>
            <CardLinkBack onClick={() => setIsInviteActive(false)} />
            <FormInviteByEmail />
          </>
        )}

        {!isInviteActive && data?.users && data.usersCount && (
          <>
            <ButtonInviteByEmail onClick={() => setIsInviteActive(true)} />

            <H2 className="text-gray-700">
              Users{" "}
              <span className="text-sm text-gray-500">({data.usersCount})</span>
            </H2>

            <UsersTable users={data.users} onFieldClick={onFieldClick} />

            {data.usersCount > perPage && (
              <div className="text-center">
                <Pagination
                  page={page}
                  perPage={perPage}
                  setPage={setPage}
                  itemsCount={data.usersCount}
                />
              </div>
            )}
          </>
        )}
      </Stack>
    </Card>
  )
}

function ButtonInviteByEmail({ onClick }: { onClick: () => void }) {
  return (
    <div className="-mt-2 text-right">
      <button
        className="px-2 py-1 transition-opacity bg-gray-300 rounded-lg opacity-50 hover:opacity-100"
        onClick={onClick}
      >
        <InlineIcon size={22}>
          <PlusCircle />
        </InlineIcon>
        <span className="mx-2">Invite by email</span>
      </button>
    </div>
  )
}
