import bcrypt from "bcrypt"
import * as config from "../../config"

export const compare = bcrypt.compare

export const hash = async (password: string) =>
  await bcrypt.hash(password, config.bcrypt.saltRounts)
