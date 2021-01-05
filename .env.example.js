if (!process.env.NODE_ENV) process.env.NODE_ENV = "dev"

const { NODE_ENV } = process.env

const PG_DB = `starter-${NODE_ENV}`

const PG_PASSWORD = "starter"
const PG_PORT = "5433"
const PG_USER = "starter"
const PG_URL = `postgresql://${PG_USER}:${PG_PASSWORD}@localhost:${PG_PORT}/${PG_DB}?schema=public&connection_limit=1`

module.exports = {
  ADMINER_PORT: "8080",
  COOKIE_SESSION_KEY1: "CHANGEME", // Some very long secret
  COOKIE_SESSION_KEY2: "CHANGEME", // Some very long secret
  PG_DB,
  PG_PASSWORD,
  PG_PORT,
  PG_USER,
  PG_URL,
  SENTRY_DSN: "CHANGEME",
}
