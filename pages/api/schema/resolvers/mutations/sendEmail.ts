type Args = {
  AFTER_SIGNUP_INSTRUCTIONS: {
    name: string
    email: string
  }
}

export const sendEmail = async <K extends keyof Args>(
  kind: K,
  options: Args[K]
) => {
  switch (kind) {
    case "AFTER_SIGNUP_INSTRUCTIONS":
      const { name, email } = options
      console.log("[sendEmail] AFTER_SIGNUP_INSTRUCTIONS")
      // TODO
      break

    default:
      break
  }
}
