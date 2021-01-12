export const isDev = process.env.NODE_ENV === "development"
export const isProd = process.env.NODE_ENV === "production"
export const isTest = process.env.NODE_ENV === "test"

export const app = {
  name: process.env.APP_NAME || "Webapp Starter",
}

export const bcrypt = {
  saltRounts: isProd ? 10 : 1,
}

const KEY1 = isDev || isTest ? "secret" : process.env.COOKIE_SESSION_KEY1
const KEY2 = isDev || isTest ? "secret" : process.env.COOKIE_SESSION_KEY2

export const cookieSession = {
  name: "session",
  keys: [KEY1, KEY2],
  maxAge: 24 * 60 * 60 * 1000,
}

export const crypto = {
  secret: isDev || isTest ? "secret" : process.env.CRYPTO_SECRET,
}

export const emails = {
  from: "noreply@example.com",
  provider: isDev ? "console" : undefined,
  test: {
    origin: "http://localhost:3000",
  },
}

export const graphql = {
  endpoint: "/api/graphql",
}

export const pages = {
  public: ["^/auth/signup$", "^/auth/verify/.+$", "^/auth/invitation/.+$"],
}

export const prisma = {
  log: isDev ? ["query", "info", "warn", "error"] : [],
}

export const sentry = {
  dsn: process.env.SENTRY_DSN,
  isEnabled: !(isDev || isTest),
}
