const isProd = process.env.NODE_ENV === "production"

export const bcrypt = {
  saltRounts: isProd ? 10 : 1,
}
