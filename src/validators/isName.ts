export const NAME_MIN_LENGTH = 3
export const NAME_MAX_LENGTH = 64

export const isName = (input: any) =>
  typeof input === "string" &&
  NAME_MIN_LENGTH <= input.length &&
  input.length <= NAME_MAX_LENGTH
