import type { ApolloError } from "apollo-server-micro"

type ApolloErrorsProps = {
  errors?: ApolloError[]
}

export function ApolloErrors({ errors }: ApolloErrorsProps) {
  if (!errors?.length) return null

  const getMessages = (error: ApolloError): string[] =>
    error.extensions?.exception?.messages ?? []

  return (
    <div className="p-4 mb-4 text-red-700 border-2 border-red-100 rounded bg-red-50">
      {errors.map((error, i) => (
        <dl key={i} className="">
          <dt className="mb-2 opacity-75">{error.message}</dt>
          {getMessages(error)?.map((message) => (
            <dd className="text-sm opacity-75" key={message}>
              {message}
            </dd>
          ))}
        </dl>
      ))}
    </div>
  )
}
