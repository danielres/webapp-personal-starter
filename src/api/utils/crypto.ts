import CryptoJS from "crypto-js"
import * as config from "../../../config"

const SECRET = config.crypto.secret

if (typeof SECRET !== "string") throw new Error("CRYPTO_SECRET must be defined")

type Object = {
  [key: string]: string | number | boolean | null | undefined | Object
}

export const encrypt = (obj: Object | string) => {
  const stringified = JSON.stringify(obj)
  const b64 = CryptoJS.AES.encrypt(stringified, SECRET).toString()
  const e64 = CryptoJS.enc.Base64.parse(b64)
  const eHex = e64.toString(CryptoJS.enc.Hex)
  return eHex
}

export const decrypt = (cipherText: string) => {
  const reb64 = CryptoJS.enc.Hex.parse(cipherText)
  const bytes = reb64.toString(CryptoJS.enc.Base64)
  const decrypt = CryptoJS.AES.decrypt(bytes, SECRET)
  const plain = decrypt.toString(CryptoJS.enc.Utf8)
  const parsed = JSON.parse(plain)
  return parsed
}
