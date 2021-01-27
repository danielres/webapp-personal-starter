import { GraphQLClient } from "graphql-request"
import { print } from "graphql"
import gql from "graphql-tag"
import { ClientError } from "graphql-request/dist/types"
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

export type Query = {
  __typename?: "Query"
  me?: Maybe<User>
  project?: Maybe<Project>
  projects: Array<Maybe<Project>>
  projectsCount?: Maybe<Scalars["Int"]>
  user?: Maybe<User>
  users: Array<Maybe<User>>
  usersCount?: Maybe<Scalars["Int"]>
}

export type QueryProjectArgs = {
  id: Scalars["Int"]
}

export type QueryProjectsArgs = {
  orderBy?: Maybe<Scalars["String"]>
  orderDirection?: Maybe<Scalars["String"]>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
}

export type QueryUserArgs = {
  id: Scalars["Int"]
}

export type QueryUsersArgs = {
  orderBy?: Maybe<Scalars["String"]>
  orderDirection?: Maybe<Scalars["String"]>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
}

export type Mutation = {
  __typename?: "Mutation"
  inviteByEmail: Scalars["Boolean"]
  projectCreate?: Maybe<Project>
  projectDelete?: Maybe<Project>
  projectUpdate?: Maybe<Project>
  resendVerificationEmail: Scalars["Boolean"]
  resetPasswordBegin: Scalars["Boolean"]
  resetPasswordFinish: Scalars["Boolean"]
  signin?: Maybe<User>
  signout: Scalars["Boolean"]
  signup: Scalars["Boolean"]
  signupWithInvitation: Scalars["Boolean"]
  userDelete?: Maybe<User>
  userUpdate?: Maybe<User>
  verifyEmail: VerifyEmailResponse
}

export type MutationInviteByEmailArgs = {
  email: Scalars["String"]
  isSuperUser?: Maybe<Scalars["Boolean"]>
}

export type MutationProjectCreateArgs = {
  name: Scalars["String"]
}

export type MutationProjectDeleteArgs = {
  id: Scalars["Int"]
}

export type MutationProjectUpdateArgs = {
  id: Scalars["Int"]
  name?: Maybe<Scalars["String"]>
  newMemberIds?: Maybe<Array<Maybe<Scalars["Int"]>>>
  removedMemberIds?: Maybe<Array<Maybe<Scalars["Int"]>>>
}

export type MutationResetPasswordBeginArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type MutationResetPasswordFinishArgs = {
  secret: Scalars["String"]
}

export type MutationSigninArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
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

export type MutationUserDeleteArgs = {
  id: Scalars["Int"]
}

export type MutationUserUpdateArgs = {
  id: Scalars["Int"]
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  isSuperUser?: Maybe<Scalars["Boolean"]>
  isApproved?: Maybe<Scalars["Boolean"]>
}

export type MutationVerifyEmailArgs = {
  emailVerificationSecret: Scalars["String"]
}

export type VerifyEmailResponse = {
  __typename?: "VerifyEmailResponse"
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type Project = {
  __typename?: "Project"
  id: Scalars["Int"]
  name: Scalars["String"]
  owner: User
  members: Array<Maybe<User>>
  createdAt: Scalars["Date"]
  updatedAt: Scalars["Date"]
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

export type ProjectsQueryVariables = Exact<{
  orderBy?: Maybe<Scalars["String"]>
  orderDirection?: Maybe<Scalars["String"]>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
}>

export type ProjectsQuery = { __typename?: "Query" } & Pick<
  Query,
  "projectsCount"
> & {
    projects: Array<
      Maybe<
        { __typename?: "Project" } & Pick<
          Project,
          "id" | "name" | "createdAt" | "updatedAt"
        > & { owner: { __typename?: "User" } & UserFieldsFragment }
      >
    >
  }

export type ProjectQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type ProjectQuery = { __typename?: "Query" } & Pick<
  Query,
  "projectsCount"
> & {
    project?: Maybe<
      { __typename?: "Project" } & Pick<
        Project,
        "id" | "name" | "createdAt" | "updatedAt"
      > & {
          owner: { __typename?: "User" } & UserFieldsFragment
          members: Array<
            Maybe<{ __typename?: "User" } & Pick<User, "id" | "name" | "email">>
          >
        }
    >
  }

export type UserQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type UserQuery = { __typename?: "Query" } & {
  user?: Maybe<{ __typename?: "User" } & UserFieldsFragment>
}

export type UsersQueryVariables = Exact<{
  orderBy?: Maybe<Scalars["String"]>
  orderDirection?: Maybe<Scalars["String"]>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
}>

export type UsersQuery = { __typename?: "Query" } & Pick<
  Query,
  "usersCount"
> & { users: Array<Maybe<{ __typename?: "User" } & UserFieldsFragment>> }

export type ProjectCreateMutationVariables = Exact<{
  name: Scalars["String"]
}>

export type ProjectCreateMutation = { __typename?: "Mutation" } & {
  projectCreate?: Maybe<
    { __typename?: "Project" } & Pick<
      Project,
      "id" | "name" | "createdAt" | "updatedAt"
    >
  >
}

export type ProjectDeleteMutationVariables = Exact<{
  id: Scalars["Int"]
}>

export type ProjectDeleteMutation = { __typename?: "Mutation" } & {
  projectDelete?: Maybe<
    { __typename?: "Project" } & Pick<Project, "id" | "name">
  >
}

export type ProjectUpdateMutationVariables = Exact<{
  id: Scalars["Int"]
  name?: Maybe<Scalars["String"]>
  newMemberIds?: Maybe<Array<Maybe<Scalars["Int"]>> | Maybe<Scalars["Int"]>>
  removedMemberIds?: Maybe<Array<Maybe<Scalars["Int"]>> | Maybe<Scalars["Int"]>>
}>

export type ProjectUpdateMutation = { __typename?: "Mutation" } & {
  projectUpdate?: Maybe<
    { __typename?: "Project" } & Pick<
      Project,
      "id" | "name" | "createdAt" | "updatedAt"
    >
  >
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

export type UserDeleteMutationVariables = Exact<{
  id: Scalars["Int"]
}>

export type UserDeleteMutation = { __typename?: "Mutation" } & {
  userDelete?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>
}

export type UserUpdateMutationVariables = Exact<{
  id: Scalars["Int"]
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  isSuperUser?: Maybe<Scalars["Boolean"]>
  isApproved?: Maybe<Scalars["Boolean"]>
}>

export type UserUpdateMutation = { __typename?: "Mutation" } & {
  userUpdate?: Maybe<{ __typename?: "User" } & UserFieldsFragment>
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
export const ProjectsDocument = gql`
  query Projects(
    $orderBy: String
    $orderDirection: String
    $take: Int
    $skip: Int
  ) {
    projects(
      orderBy: $orderBy
      orderDirection: $orderDirection
      take: $take
      skip: $skip
    ) {
      id
      name
      owner {
        ...UserFields
      }
      createdAt
      updatedAt
    }
    projectsCount
  }
  ${UserFieldsFragmentDoc}
`
export const ProjectDocument = gql`
  query Project($id: Int!) {
    project(id: $id) {
      id
      name
      owner {
        ...UserFields
      }
      members {
        id
        name
        email
      }
      createdAt
      updatedAt
    }
    projectsCount
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
  query Users(
    $orderBy: String
    $orderDirection: String
    $take: Int
    $skip: Int
  ) {
    users(
      orderBy: $orderBy
      orderDirection: $orderDirection
      take: $take
      skip: $skip
    ) {
      ...UserFields
    }
    usersCount
  }
  ${UserFieldsFragmentDoc}
`
export const ProjectCreateDocument = gql`
  mutation ProjectCreate($name: String!) {
    projectCreate(name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const ProjectDeleteDocument = gql`
  mutation ProjectDelete($id: Int!) {
    projectDelete(id: $id) {
      id
      name
    }
  }
`
export const ProjectUpdateDocument = gql`
  mutation ProjectUpdate(
    $id: Int!
    $name: String
    $newMemberIds: [Int]
    $removedMemberIds: [Int]
  ) {
    projectUpdate(
      id: $id
      name: $name
      newMemberIds: $newMemberIds
      removedMemberIds: $removedMemberIds
    ) {
      id
      name
      createdAt
      updatedAt
    }
  }
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
export const UserDeleteDocument = gql`
  mutation UserDelete($id: Int!) {
    userDelete(id: $id) {
      id
      name
    }
  }
`
export const UserUpdateDocument = gql`
  mutation UserUpdate(
    $id: Int!
    $email: String
    $name: String
    $isSuperUser: Boolean
    $isApproved: Boolean
  ) {
    userUpdate(
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
    Projects(
      variables?: ProjectsQueryVariables,
      requestHeaders?: Headers
    ): Promise<ProjectsQuery> {
      return withWrapper(() =>
        client.request<ProjectsQuery>(
          print(ProjectsDocument),
          variables,
          requestHeaders
        )
      )
    },
    Project(
      variables: ProjectQueryVariables,
      requestHeaders?: Headers
    ): Promise<ProjectQuery> {
      return withWrapper(() =>
        client.request<ProjectQuery>(
          print(ProjectDocument),
          variables,
          requestHeaders
        )
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
    ProjectCreate(
      variables: ProjectCreateMutationVariables,
      requestHeaders?: Headers
    ): Promise<ProjectCreateMutation> {
      return withWrapper(() =>
        client.request<ProjectCreateMutation>(
          print(ProjectCreateDocument),
          variables,
          requestHeaders
        )
      )
    },
    ProjectDelete(
      variables: ProjectDeleteMutationVariables,
      requestHeaders?: Headers
    ): Promise<ProjectDeleteMutation> {
      return withWrapper(() =>
        client.request<ProjectDeleteMutation>(
          print(ProjectDeleteDocument),
          variables,
          requestHeaders
        )
      )
    },
    ProjectUpdate(
      variables: ProjectUpdateMutationVariables,
      requestHeaders?: Headers
    ): Promise<ProjectUpdateMutation> {
      return withWrapper(() =>
        client.request<ProjectUpdateMutation>(
          print(ProjectUpdateDocument),
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
    UserDelete(
      variables: UserDeleteMutationVariables,
      requestHeaders?: Headers
    ): Promise<UserDeleteMutation> {
      return withWrapper(() =>
        client.request<UserDeleteMutation>(
          print(UserDeleteDocument),
          variables,
          requestHeaders
        )
      )
    },
    UserUpdate(
      variables: UserUpdateMutationVariables,
      requestHeaders?: Headers
    ): Promise<UserUpdateMutation> {
      return withWrapper(() =>
        client.request<UserUpdateMutation>(
          print(UserUpdateDocument),
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
    useMe(
      variables?: MeQueryVariables,
      config?: SWRConfigInterface<MeQuery, ClientError>
    ) {
      return useSWR<MeQuery, ClientError>(
        genKey<MeQueryVariables>("Me", variables),
        () => sdk.Me(variables),
        config
      )
    },
    useProjects(
      variables?: ProjectsQueryVariables,
      config?: SWRConfigInterface<ProjectsQuery, ClientError>
    ) {
      return useSWR<ProjectsQuery, ClientError>(
        genKey<ProjectsQueryVariables>("Projects", variables),
        () => sdk.Projects(variables),
        config
      )
    },
    useProject(
      variables: ProjectQueryVariables,
      config?: SWRConfigInterface<ProjectQuery, ClientError>
    ) {
      return useSWR<ProjectQuery, ClientError>(
        genKey<ProjectQueryVariables>("Project", variables),
        () => sdk.Project(variables),
        config
      )
    },
    useUser(
      variables: UserQueryVariables,
      config?: SWRConfigInterface<UserQuery, ClientError>
    ) {
      return useSWR<UserQuery, ClientError>(
        genKey<UserQueryVariables>("User", variables),
        () => sdk.User(variables),
        config
      )
    },
    useUsers(
      variables?: UsersQueryVariables,
      config?: SWRConfigInterface<UsersQuery, ClientError>
    ) {
      return useSWR<UsersQuery, ClientError>(
        genKey<UsersQueryVariables>("Users", variables),
        () => sdk.Users(variables),
        config
      )
    },
  }
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>
