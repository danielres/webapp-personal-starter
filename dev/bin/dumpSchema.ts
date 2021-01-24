import fs from "fs"
import { typeDefs } from "../../src/api/schema"

const path = "src/generated/schema.graphql"

const output = `# This file has been automatically generated.
# Please do not edit!
${typeDefs}
`

fs.writeFile(path, output, () => {
  console.log(`[dumpSchema] Updated file "${path}"`)
})
