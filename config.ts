const ENV = process.env.NODE_ENV as string
export const isDev = ENV === "development"
export const isProd = ENV === "production"
export const isStaging = ENV === "staging"
export const isTest = ENV === "test"

export const app = {
  name: process.env.APP_NAME || "Webapp Starter",
}

export const auth = {
  password: {
    reset: {
      ttl: 1000 * 60 * 5, // 5 minutes (please use only whole minutes)
    },
  },
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

type EmailProvider = "mailtrap" | "noop" | "console"
const getEmailProvider = (): EmailProvider => {
  const { EMAIL_PROVIDER } = process.env
  if (EMAIL_PROVIDER) return EMAIL_PROVIDER as EmailProvider

  if (isStaging || isProd) return "mailtrap"
  if (isTest) return "noop"
  if (isDev) return "console"
  return "console"
}

export const email = {
  from: "noreply@example.com",
  provider: getEmailProvider(),
  providers: {
    mailtrap: {
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_PROVIDERS_MAILTRAP_AUTH_USER,
        pass: process.env.EMAIL_PROVIDERS_MAILTRAP_AUTH_PASS,
      },
    },
  },
  test: {
    origin: "http://localhost:3000",
  },
}

export const graphql = {
  endpoint: "/api/graphql",
}

export const pages = {
  public: [
    "^/auth/signup$",
    "^/auth/verify/.+$",
    "^/auth/invitation/.+$",
    "^/auth/password/reset.*$",
  ],
}

export const prisma = {
  log: isDev ? ["query", "info", "warn", "error"] : [],
}

export const sentry = {
  dsn: process.env.SENTRY_DSN,
  isEnabled: !(isDev || isTest),
}
