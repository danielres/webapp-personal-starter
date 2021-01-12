export const getPath = {
  home: () => `/`,
  signin: () => `/`,
  signup: {
    regular: () => `/auth/signup`,
    verifyEmail: (secret: string) => `/auth/verify/${secret}`,
    withInvitation: (secret: string) => `/auth/invitation/${secret}`,
  },

  admin: {
    home: () => `/admin`,
    projects: {
      home: () => `#`,
    },
    users: {
      home: () => `/admin`,
      edit: (id: number) => `/admin/${id}`,
    },
  },
}
