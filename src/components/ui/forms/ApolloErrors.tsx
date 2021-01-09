import type { ApolloError } from "apollo-server-micro"
import { Alert } from "../Alert"

type ApolloErrorsProps = {
  errors?: ApolloError[]
}

export function ApolloErrors({ errors }: ApolloErrorsProps) {
  if (!errors?.length) return null

  const getMessages = (error: ApolloError): string[] =>
    error.extensions?.exception?.messages ?? []

  return (
    <Alert variant="danger">
      {errors.map((error, i) => (
        <div key={i}>
          <div className="opacity-75">{error.message}</div>

          {getMessages(error)?.length > 0 && (
            <ul className="mt-2">
              {getMessages(error)?.map((message) => (
                <li className="text-sm opacity-75" key={message}>
                  {message}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </Alert>
  )
}
