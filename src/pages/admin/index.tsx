import React, { useState } from "react"
import { FormInviteByEmail } from "../../components/admin/forms/FormInviteByEmail"
import { UsersTable } from "../../components/admin/UsersTable"
import { InlineIcon } from "../../components/Icons/InlineIcon"
import { PlusCircle } from "../../components/Icons/PlusCircle"
import { Card } from "../../components/ui/Card"
import { CardLinkBack } from "../../components/ui/CardLinkBack"
import { Stack } from "../../components/ui/Stack"

export default function Admin() {
  const [isInviteActive, setIsInviteActive] = useState(false)

  return (
    <Card className="animate-fadein-fast">
      <Stack>
        {isInviteActive && (
          <>
            <CardLinkBack onClick={() => setIsInviteActive(false)} />
            <FormInviteByEmail />
          </>
        )}

        {!isInviteActive && (
          <>
            <ButtonInviteByEmail onClick={() => setIsInviteActive(true)} />
            <UsersTable />
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
