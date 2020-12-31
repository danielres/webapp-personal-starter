import type { ApolloError } from "apollo-server-micro"

type ApolloErrorsProps = {
  errors?: ApolloError[]
}

export function ApolloErrors({ errors }: ApolloErrorsProps) {
  if (!errors?.length) return null

  const getMessages = (error: ApolloError): string[] =>
    error.extensions?.exception?.messages ?? []

  return (
    <div>
      {errors.map((error, i) => (
        <div key={i}>
          <div>{error.message}</div>
          {getMessages(error).length > 0 && (
            <ul>
              {getMessages(error)?.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
