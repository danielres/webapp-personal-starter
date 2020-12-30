import type { ApolloError } from "apollo-server-micro"

export function ApolloErrors({ errors }: { errors: ApolloError[] }) {
  if (!errors?.length) return null

  const getMessages = (error: ApolloError): string[] =>
    error.extensions?.exception?.messages ?? []

  return (
    <div>
      {errors.map((error) => (
        <div>
          <div>{error.message}</div>
          {getMessages(error).length > 0 && (
            <ul>
              {getMessages(error)?.map((message) => (
                <li>{message}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
