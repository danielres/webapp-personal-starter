module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/.github/",
    "<rootDir>/node_modules/",
    "<rootDir>/coverage/",
    "<rootDir>/.vscode/",
    "<rootDir>/tmp/",
  ],
  testEnvironment: "./jest/CustomEnvironment",
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["html"],
}
