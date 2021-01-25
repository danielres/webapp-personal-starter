import React from "react"
import { Arrow } from "../Icons/Arrow"
import { InlineIcon } from "../Icons/InlineIcon"
import { Button } from "./Button"

type PaginationProps = {
  itemsCount: number
  page: number
  perPage: number
  setPage: (page: number) => void
}

export function Pagination({
  itemsCount,
  page,
  perPage,
  setPage,
}: PaginationProps) {
  const hasNextPage = perPage * (page + 1) < itemsCount

  return (
    <>
      <Button
        disabled={page === 0}
        onClick={() => page > 0 && setPage(page - 1)}
      >
        <InlineIcon>
          <Arrow direction="left" />
        </InlineIcon>{" "}
      </Button>

      <span className="text-sm text-gray-400">
        {page + 1} / {Math.ceil(itemsCount / perPage)}
      </span>

      <Button
        disabled={!hasNextPage}
        onClick={() => hasNextPage && setPage(page + 1)}
      >
        <InlineIcon>
          <Arrow direction="right" />
        </InlineIcon>
      </Button>
    </>
  )
}
