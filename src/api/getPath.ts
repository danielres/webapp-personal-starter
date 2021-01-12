export const getPath = {
  home: () => `/`,
  signin: () => `/`,
  signup: {
    regular: () => `/register`,
    withInvitation: (secret: string) => `/register/invitation/${secret}`,
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
