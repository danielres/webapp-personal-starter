import React, { useState } from "react"
import { FormProjectAdd } from "../../components/admin/forms/FormProjectAdd"
import { ProjectsTable } from "../../components/admin/ProjectsTable"
import { InlineIcon } from "../../components/Icons/InlineIcon"
import { PlusCircle } from "../../components/Icons/PlusCircle"
import { Card } from "../../components/ui/Card"
import { CardLinkBack } from "../../components/ui/CardLinkBack"
import { Stack } from "../../components/ui/Stack"

export default function PageAdminProjects() {
  const [isAddProjectActive, setIsAddProjectActive] = useState(false)

  return (
    <Card className="animate-fadein-fast">
      <Stack>
        {isAddProjectActive && (
          <>
            <CardLinkBack onClick={() => setIsAddProjectActive(false)} />
            <FormProjectAdd />
          </>
        )}

        {!isAddProjectActive && (
          <>
            <ButtonCreateProject onClick={() => setIsAddProjectActive(true)} />
            <ProjectsTable />
          </>
        )}
      </Stack>
    </Card>
  )
}

function ButtonCreateProject({ onClick }: { onClick: () => void }) {
  return (
    <div className="-mt-2 text-right">
      <button
        className="px-2 py-1 transition-opacity bg-gray-300 rounded-lg opacity-50 hover:opacity-100"
        onClick={onClick}
      >
        <InlineIcon size={22}>
          <PlusCircle />
        </InlineIcon>
        <span className="mx-2">Add project</span>
      </button>
    </div>
  )
}
