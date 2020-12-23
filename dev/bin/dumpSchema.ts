import fs from "fs"
import { typeDefs } from "../../pages/api/schema/typeDefs"

const path = "generated/schema.graphql"

const output = `# This file has been automatically generated.
# Please do not edit!
${typeDefs}
`

fs.writeFile(path, output, () => {
  console.log(`[dumpSchema] Updated file "${path}"`)
})
