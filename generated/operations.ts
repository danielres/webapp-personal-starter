import { GraphQLClient } from "graphql-request"
import { print } from "graphql"
import gql from "graphql-tag"
import useSWR, {
  ConfigInterface as SWRConfigInterface,
  keyInterface as SWRKeyInterface,
} from "swr"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  EmailAddress: any
  Password: any
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  name: Scalars["String"]
  email: Scalars["EmailAddress"]
  isSuperUser: Scalars["Boolean"]
  createdAt: Scalars["Date"]
  updatedAt: Scalars["Date"]
}

export type Query = {
  __typename?: "Query"
  me?: Maybe<User>
  users: Array<Maybe<User>>
}

export type Mutation = {
  __typename?: "Mutation"
  signup: Scalars["Boolean"]
  signin?: Maybe<User>
  signout: Scalars["Boolean"]
}

export type MutationSignupArgs = {
  email: Scalars["EmailAddress"]
  password: Scalars["Password"]
  name: Scalars["String"]
}

export type MutationSigninArgs = {
  email: Scalars["EmailAddress"]
  password: Scalars["Password"]
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<
    Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "name" | "email" | "isSuperUser" | "createdAt" | "updatedAt"
      >
    >
  >
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "name" | "email" | "isSuperUser" | "createdAt" | "updatedAt"
    >
  >
}

export type SignupMutationVariables = Exact<{
  email: Scalars["EmailAddress"]
  name: Scalars["String"]
  password: Scalars["Password"]
}>

export type SignupMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signup"
>

export type SigninMutationVariables = Exact<{
  email: Scalars["EmailAddress"]
  password: Scalars["Password"]
}>

export type SigninMutation = { __typename?: "Mutation" } & {
  signin?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "name" | "email" | "isSuperUser" | "createdAt" | "updatedAt"
    >
  >
}

export type SignoutMutationVariables = Exact<{ [key: string]: never }>

export type SignoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signout"
>

export const UsersDocument = gql`
  query Users {
    users {
      id
      name
      email
      isSuperUser
      createdAt
      updatedAt
    }
  }
`
export const MeDocument = gql`
  query Me {
    me {
      id
      name
      email
      isSuperUser
      createdAt
      updatedAt
    }
  }
`
export const SignupDocument = gql`
  mutation Signup($email: EmailAddress!, $name: String!, $password: Password!) {
    signup(email: $email, name: $name, password: $password)
  }
`
export const SigninDocument = gql`
  mutation Signin($email: EmailAddress!, $password: Password!) {
    signin(email: $email, password: $password) {
      id
      name
      email
      isSuperUser
      createdAt
      updatedAt
    }
  }
`
export const SignoutDocument = gql`
  mutation Signout {
    signout
  }
`

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (sdkFunction) => sdkFunction()
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    Users(
      variables?: UsersQueryVariables,
      requestHeaders?: Headers
    ): Promise<UsersQuery> {
      return withWrapper(() =>
        client.request<UsersQuery>(
          print(UsersDocument),
          variables,
          requestHeaders
        )
      )
    },
    Me(
      variables?: MeQueryVariables,
      requestHeaders?: Headers
    ): Promise<MeQuery> {
      return withWrapper(() =>
        client.request<MeQuery>(print(MeDocument), variables, requestHeaders)
      )
    },
    Signup(
      variables: SignupMutationVariables,
      requestHeaders?: Headers
    ): Promise<SignupMutation> {
      return withWrapper(() =>
        client.request<SignupMutation>(
          print(SignupDocument),
          variables,
          requestHeaders
        )
      )
    },
    Signin(
      variables: SigninMutationVariables,
      requestHeaders?: Headers
    ): Promise<SigninMutation> {
      return withWrapper(() =>
        client.request<SigninMutation>(
          print(SigninDocument),
          variables,
          requestHeaders
        )
      )
    },
    Signout(
      variables?: SignoutMutationVariables,
      requestHeaders?: Headers
    ): Promise<SignoutMutation> {
      return withWrapper(() =>
        client.request<SignoutMutation>(
          print(SignoutDocument),
          variables,
          requestHeaders
        )
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>

export function getSdkWithHooks(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  const sdk = getSdk(client, withWrapper)
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(
    name: string,
    object: V = {} as V
  ): SWRKeyInterface => [
    name,
    ...Object.keys(object)
      .sort()
      .map((key) => object[key]),
  ]
  return {
    ...sdk,
    useUsers(
      variables?: UsersQueryVariables,
      config?: SWRConfigInterface<UsersQuery>
    ) {
      return useSWR<UsersQuery>(
        genKey<UsersQueryVariables>("Users", variables),
        () => sdk.Users(variables),
        config
      )
    },
    useMe(variables?: MeQueryVariables, config?: SWRConfigInterface<MeQuery>) {
      return useSWR<MeQuery>(
        genKey<MeQueryVariables>("Me", variables),
        () => sdk.Me(variables),
        config
      )
    },
  }
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>
