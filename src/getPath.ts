import * as config from "../config"

// Please make sure to declare non-protected (public) page paths here:
config.pages.public

export const getPath = {
  home: () => `/`,
  password: {
    reset: {
      begin: () => `/auth/password/reset`,
      finish: (secret: string) => `/auth/password/reset?secret=${secret}`,
    },
  },
  signin: () => `/`,
  signup: {
    regular: () => `/auth/signup`,
    verifyEmail: (secret: string) => `/auth/verify/${secret}`,
    withInvitation: (secret: string) => `/auth/invitation/${secret}`,
  },

  admin: {
    home: () => `/admin/users`,
    projects: {
      home: () => `/admin#`,
    },
    users: {
      home: () => `/admin/users`,
      edit: (id: number) => `/admin/users/${id}`,
    },
  },
}
