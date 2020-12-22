type EnvName = "dev" | "test" | "staging"
type EnvNames = EnvName[]

const NODE_ENV = process.env.NODE_ENV as EnvName

// Provides a guard for dangerous operations,
// allowing execution only under certain environments.

// Examples:
//   allowOnlyIn("test");
//   allowOnlyIn("dev", "test", "staging");

export const allowOnlyIn = (...allowedEnvs: EnvNames) => {
  if (!allowedEnvs.includes(NODE_ENV))
    throw new Error(`Operation allowed only under: ${allowedEnvs.join(", ")}`)
}
