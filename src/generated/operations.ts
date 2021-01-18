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
}

export type User = {
  __typename?: "User"
  id: Scalars["Int"]
  name: Scalars["String"]
  email: Scalars["String"]
  isApproved: Scalars["Boolean"]
  isSuperUser: Scalars["Boolean"]
  emailVerifiedAt?: Maybe<Scalars["Date"]>
  createdAt: Scalars["Date"]
  updatedAt: Scalars["Date"]
}

export type Query = {
  __typename?: "Query"
  me?: Maybe<User>
  user?: Maybe<User>
  users: Array<Maybe<User>>
}

export type QueryUserArgs = {
  id: Scalars["Int"]
}

export type VerifyEmailResponse = {
  __typename?: "VerifyEmailResponse"
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  inviteByEmail: Scalars["Boolean"]
  resendVerificationEmail: Scalars["Boolean"]
  resetPasswordBegin: Scalars["Boolean"]
  resetPasswordFinish: Scalars["Boolean"]
  signup: Scalars["Boolean"]
  signupWithInvitation: Scalars["Boolean"]
  signin?: Maybe<User>
  signout: Scalars["Boolean"]
  updateUser?: Maybe<User>
  verifyEmail: VerifyEmailResponse
}

export type MutationInviteByEmailArgs = {
  email: Scalars["String"]
  isSuperUser?: Maybe<Scalars["Boolean"]>
}

export type MutationResetPasswordBeginArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type MutationResetPasswordFinishArgs = {
  secret: Scalars["String"]
}

export type MutationSignupArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
  name: Scalars["String"]
}

export type MutationSignupWithInvitationArgs = {
  password: Scalars["String"]
  name: Scalars["String"]
  secret: Scalars["String"]
}

export type MutationSigninArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type MutationUpdateUserArgs = {
  id: Scalars["Int"]
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  isSuperUser?: Maybe<Scalars["Boolean"]>
  isApproved?: Maybe<Scalars["Boolean"]>
}

export type MutationVerifyEmailArgs = {
  emailVerificationSecret: Scalars["String"]
}

export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  | "id"
  | "name"
  | "email"
  | "isApproved"
  | "isSuperUser"
  | "emailVerifiedAt"
  | "createdAt"
  | "updatedAt"
>

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserFieldsFragment>
}

export type UserQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type UserQuery = { __typename?: "Query" } & {
  user?: Maybe<{ __typename?: "User" } & UserFieldsFragment>
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<Maybe<{ __typename?: "User" } & UserFieldsFragment>>
}

export type InviteByEmailMutationVariables = Exact<{
  email: Scalars["String"]
  isSuperUser?: Maybe<Scalars["Boolean"]>
}>

export type InviteByEmailMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "inviteByEmail"
>

export type ResendVerificationEmailMutationVariables = Exact<{
  [key: string]: never
}>

export type ResendVerificationEmailMutation = {
  __typename?: "Mutation"
} & Pick<Mutation, "resendVerificationEmail">

export type ResetPasswordBeginMutationVariables = Exact<{
  email: Scalars["String"]
  password: Scalars["String"]
}>

export type ResetPasswordBeginMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resetPasswordBegin"
>

export type ResetPasswordFinishMutationVariables = Exact<{
  secret: Scalars["String"]
}>

export type ResetPasswordFinishMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resetPasswordFinish"
>

export type SignupMutationVariables = Exact<{
  email: Scalars["String"]
  name: Scalars["String"]
  password: Scalars["String"]
}>

export type SignupMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signup"
>

export type SignupWithInvitationMutationVariables = Exact<{
  name: Scalars["String"]
  password: Scalars["String"]
  secret: Scalars["String"]
}>

export type SignupWithInvitationMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signupWithInvitation"
>

export type SigninMutationVariables = Exact<{
  email: Scalars["String"]
  password: Scalars["String"]
}>

export type SigninMutation = { __typename?: "Mutation" } & {
  signin?: Maybe<{ __typename?: "User" } & UserFieldsFragment>
}

export type SignoutMutationVariables = Exact<{ [key: string]: never }>

export type SignoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signout"
>

export type UpdateUserMutationVariables = Exact<{
  id: Scalars["Int"]
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  isSuperUser?: Maybe<Scalars["Boolean"]>
  isApproved?: Maybe<Scalars["Boolean"]>
}>

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser?: Maybe<{ __typename?: "User" } & UserFieldsFragment>
}

export type VerifyEmailMutationVariables = Exact<{
  emailVerificationSecret: Scalars["String"]
}>

export type VerifyEmailMutation = { __typename?: "Mutation" } & {
  verifyEmail: { __typename?: "VerifyEmailResponse" } & Pick<
    VerifyEmailResponse,
    "email" | "name"
  >
}

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    name
    email
    isApproved
    isSuperUser
    emailVerifiedAt
    createdAt
    updatedAt
  }
`
export const MeDocument = gql`
  query Me {
    me {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`
export const UserDocument = gql`
  query User($id: Int!) {
    user(id: $id) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`
export const UsersDocument = gql`
  query Users {
    users {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`
export const InviteByEmailDocument = gql`
  mutation InviteByEmail($email: String!, $isSuperUser: Boolean) {
    inviteByEmail(email: $email, isSuperUser: $isSuperUser)
  }
`
export const ResendVerificationEmailDocument = gql`
  mutation ResendVerificationEmail {
    resendVerificationEmail
  }
`
export const ResetPasswordBeginDocument = gql`
  mutation ResetPasswordBegin($email: String!, $password: String!) {
    resetPasswordBegin(email: $email, password: $password)
  }
`
export const ResetPasswordFinishDocument = gql`
  mutation ResetPasswordFinish($secret: String!) {
    resetPasswordFinish(secret: $secret)
  }
`
export const SignupDocument = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password)
  }
`
export const SignupWithInvitationDocument = gql`
  mutation SignupWithInvitation(
    $name: String!
    $password: String!
    $secret: String!
  ) {
    signupWithInvitation(name: $name, password: $password, secret: $secret)
  }
`
export const SigninDocument = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`
export const SignoutDocument = gql`
  mutation Signout {
    signout
  }
`
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $id: Int!
    $email: String
    $name: String
    $isSuperUser: Boolean
    $isApproved: Boolean
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      isSuperUser: $isSuperUser
      isApproved: $isApproved
    ) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`
export const VerifyEmailDocument = gql`
  mutation VerifyEmail($emailVerificationSecret: String!) {
    verifyEmail(emailVerificationSecret: $emailVerificationSecret) {
      email
      name
    }
  }
`

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (sdkFunction) => sdkFunction()
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    Me(
      variables?: MeQueryVariables,
      requestHeaders?: Headers
    ): Promise<MeQuery> {
      return withWrapper(() =>
        client.request<MeQuery>(print(MeDocument), variables, requestHeaders)
      )
    },
    User(
      variables: UserQueryVariables,
      requestHeaders?: Headers
    ): Promise<UserQuery> {
      return withWrapper(() =>
        client.request<UserQuery>(
          print(UserDocument),
          variables,
          requestHeaders
        )
      )
    },
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
    InviteByEmail(
      variables: InviteByEmailMutationVariables,
      requestHeaders?: Headers
    ): Promise<InviteByEmailMutation> {
      return withWrapper(() =>
        client.request<InviteByEmailMutation>(
          print(InviteByEmailDocument),
          variables,
          requestHeaders
        )
      )
    },
    ResendVerificationEmail(
      variables?: ResendVerificationEmailMutationVariables,
      requestHeaders?: Headers
    ): Promise<ResendVerificationEmailMutation> {
      return withWrapper(() =>
        client.request<ResendVerificationEmailMutation>(
          print(ResendVerificationEmailDocument),
          variables,
          requestHeaders
        )
      )
    },
    ResetPasswordBegin(
      variables: ResetPasswordBeginMutationVariables,
      requestHeaders?: Headers
    ): Promise<ResetPasswordBeginMutation> {
      return withWrapper(() =>
        client.request<ResetPasswordBeginMutation>(
          print(ResetPasswordBeginDocument),
          variables,
          requestHeaders
        )
      )
    },
    ResetPasswordFinish(
      variables: ResetPasswordFinishMutationVariables,
      requestHeaders?: Headers
    ): Promise<ResetPasswordFinishMutation> {
      return withWrapper(() =>
        client.request<ResetPasswordFinishMutation>(
          print(ResetPasswordFinishDocument),
          variables,
          requestHeaders
        )
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
    SignupWithInvitation(
      variables: SignupWithInvitationMutationVariables,
      requestHeaders?: Headers
    ): Promise<SignupWithInvitationMutation> {
      return withWrapper(() =>
        client.request<SignupWithInvitationMutation>(
          print(SignupWithInvitationDocument),
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
    UpdateUser(
      variables: UpdateUserMutationVariables,
      requestHeaders?: Headers
    ): Promise<UpdateUserMutation> {
      return withWrapper(() =>
        client.request<UpdateUserMutation>(
          print(UpdateUserDocument),
          variables,
          requestHeaders
        )
      )
    },
    VerifyEmail(
      variables: VerifyEmailMutationVariables,
      requestHeaders?: Headers
    ): Promise<VerifyEmailMutation> {
      return withWrapper(() =>
        client.request<VerifyEmailMutation>(
          print(VerifyEmailDocument),
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
    useMe(variables?: MeQueryVariables, config?: SWRConfigInterface<MeQuery>) {
      return useSWR<MeQuery>(
        genKey<MeQueryVariables>("Me", variables),
        () => sdk.Me(variables),
        config
      )
    },
    useUser(
      variables: UserQueryVariables,
      config?: SWRConfigInterface<UserQuery>
    ) {
      return useSWR<UserQuery>(
        genKey<UserQueryVariables>("User", variables),
        () => sdk.User(variables),
        config
      )
    },
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
  }
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>
