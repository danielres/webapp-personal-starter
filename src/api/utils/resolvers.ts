import * as config from "../../../config"

export type sortAndPaginateArgs = {
  orderBy?: string | null
  orderDirection?: string | null
  take?: number | null
  skip?: number | null
}

export const sortAndPaginate = (
  args: sortAndPaginateArgs,
  defaults = { orderBy: "name" }
) => {
  const orderBy = args.orderBy ?? defaults.orderBy
  const orderDirection = args.orderDirection ?? "asc"

  const skip = args.skip ?? 0
  const take =
    args.take === null
      ? undefined
      : args.take ?? config.pagination.perPage.default

  return {
    orderBy: [{ [orderBy]: orderDirection }],
    skip,
    take,
  }
}
