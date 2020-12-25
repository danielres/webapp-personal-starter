const { PrismaClient } = require("@prisma/client")
const NodeEnvironment = require("jest-environment-node")
const truncateAll = require("./support/truncateAll")

module.exports = class extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
    this.docblockPragmas = context.docblockPragmas
  }

  async setup() {
    await super.setup()
    if ("usePrisma" in this.docblockPragmas) {
      this.global.prisma = new PrismaClient()
      await truncateAll(this.global.prisma)
    }
  }

  async teardown() {
    if ("usePrisma" in this.docblockPragmas) {
      this.global.prisma.$disconnect()
    }
    await super.teardown()
  }
}
