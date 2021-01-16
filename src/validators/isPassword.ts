export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 256

export const isPassword = (input: any) =>
  typeof input === "string" &&
  PASSWORD_MIN_LENGTH <= input.length &&
  input.length <= PASSWORD_MAX_LENGTH
