export const reportError = (error: Error) => {
  console.log()
  console.log("[reportError] ".padEnd(60, "-"))
  console.error(error)
  console.log("".padEnd(60, "-"))
  console.log()
}
