import React, { useState } from "react"
import * as config from "../../../config"
import { FormProjectAdd } from "../../components/admin/forms/FormProjectAdd"
import { ProjectsTable } from "../../components/admin/ProjectsTable"
import { InlineIcon } from "../../components/Icons/InlineIcon"
import { PlusCircle } from "../../components/Icons/PlusCircle"
import { Card } from "../../components/ui/Card"
import { CardLinkBack } from "../../components/ui/CardLinkBack"
import { H2 } from "../../components/ui/H2"
import { Pagination } from "../../components/ui/Pagination"
import { Stack } from "../../components/ui/Stack"
import { sdk } from "../../sdk"

const perPage = config.pagination.perPage.default

export default function PageAdminProjects() {
  const [isAddProjectDialogActive, setIsAddProjectDialogActive] = useState(
    false
  )
  const [page, setPage] = useState(0)

  const [orderBy, setOrderBy] = useState("name")
  const [isAsc, setIsAsc] = useState(true)

  const onFieldClick = (field: string) => {
    setOrderBy(field)
    if (field === orderBy) setIsAsc(!isAsc)
  }

  const { data, error } = sdk.useProjects({
    skip: page * perPage,
    take: perPage,
    orderBy,
    orderDirection: isAsc ? "asc" : "desc",
  })

  if (error) return <div>{error.message}</div> // FIXME

  return (
    <Card className="animate-fadein-fast">
      <Stack>
        {isAddProjectDialogActive && (
          <>
            <CardLinkBack onClick={() => setIsAddProjectDialogActive(false)} />
            <FormProjectAdd />
          </>
        )}

        {!isAddProjectDialogActive && data?.projects && data.projectsCount && (
          <>
            <ButtonCreateProject
              onClick={() => setIsAddProjectDialogActive(true)}
            />

            <H2 className="text-gray-700">
              Projects{" "}
              <span className="text-sm text-gray-500">
                ({data.projectsCount})
              </span>
            </H2>

            <ProjectsTable
              projects={data.projects}
              onFieldClick={onFieldClick}
            />

            {data.projectsCount > perPage && (
              <div className="text-center">
                <Pagination
                  page={page}
                  perPage={perPage}
                  setPage={setPage}
                  itemsCount={data.projectsCount}
                />
              </div>
            )}
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
