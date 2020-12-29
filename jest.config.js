module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testEnvironment: "./jest/CustomEnvironment",
  verbose: true,
}
