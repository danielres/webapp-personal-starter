type Args = {
  AFTER_SIGNUP_INSTRUCTIONS: {
    email: string
  }
}

export const sendEmail = async <K extends keyof Args>(
  kind: K,
  options: Args[K]
) => {
  switch (kind) {
    case "AFTER_SIGNUP_INSTRUCTIONS":
      // Covers 2 cases:
      // 1. user just signed up successfully
      // 2. user attempted to sign up but email already exists

      const { email } = options
      // TODO
      console.log("[sendEmail] AFTER_SIGNUP_INSTRUCTIONS", { email, name })
      break

    default:
      break
  }
}
