export const codes = {
  prisma: {
    UNIQUE_VALIDATION_FAILURE: "P2002",
  },
}

// Used for unknown server-side errors. The arbitrary id allows for easier debugging:
export const ServerError = (id: string) => new Error(`Server error #${id}`)
