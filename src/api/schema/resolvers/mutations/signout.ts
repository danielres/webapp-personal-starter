import { Context } from "../../../context"

export const signout = (_: unused, __: unused, { req }: Context) => {
  req.session = null
  return req.session === null
}
