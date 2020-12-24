const isProd = process.env.NODE_ENV === "production"

export const bcrypt = {
  saltRounts: isProd ? 10 : 1,
}

const KEY1 = process.env.COOKIE_SESSION_KEY1
const KEY2 = process.env.COOKIE_SESSION_KEY2

export const cookieSession = {
  name: "session",
  keys: [KEY1, KEY2],
  maxAge: 24 * 60 * 60 * 1000,
}
