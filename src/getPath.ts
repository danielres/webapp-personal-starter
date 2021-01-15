import * as config from "../config"

// Please make sure to declare non-protected (public) page paths here:
config.pages.public

export const getPath = {
  home: () => `/`,
  resetPassword: () => `/`, // TODO
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
