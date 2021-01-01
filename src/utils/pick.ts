//  Creates an object composed of the picked `obj` properties.

export const pick = (keys: string[]) => (obj: Record<string, string>) =>
  Object.assign({}, ...keys.map((key) => ({ [key]: obj[key] })))
