const isDev = process.env.NODE_ENV === "development"
const isProd = process.env.NODE_ENV === "production"
const isTest = process.env.NODE_ENV === "test"

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

export const emails = {
  from: "noreply@example.com",
  provider: isDev ? "console" : undefined,
}

export const graphql = {
  endpoint: "/api/graphql",
}

export const prisma = {
  log: isDev ? ["query", "info", "warn", "error"] : [],
}

export const sentry = {
  dsn: process.env.SENTRY_DSN,
  isEnabled: !(isDev || isTest),
}
