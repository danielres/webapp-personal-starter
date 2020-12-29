type ServerError = { message: string }

export type ServerErrorResponse =
  | { response: { errors: ServerError[] } }
  | undefined

export function ErrorResponse({ response }: { response: ServerErrorResponse }) {
  if (!response) return null

  return (
    <div>
      {response.response.errors.map((e) => (
        <div>{e.message}</div>
      ))}
    </div>
  )
}
