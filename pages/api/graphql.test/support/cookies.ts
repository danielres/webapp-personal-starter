export const getNames = (headers: { "set-cookie": string[] }) =>
  headers["set-cookie"].map((c: string) => c.split("=")[0])

export const getValues = (headers: { "set-cookie": string[] }) =>
  headers["set-cookie"].map((c: string) => c.split("=")[1].split(";")[0])
