import * as crypto from "./crypto"

describe("crypto", () => {
  it("encrypts/decrypts an object into an url-friendly string", () => {
    const object = { foo: "Foo", bar: { bar: "bar" } }

    const encrypted = crypto.encrypt(object)
    const decrypted = crypto.decrypt(encrypted)

    expect(typeof encrypted).toEqual("string")
    expect(encrypted.length > 20).toEqual(true)
    expect(decrypted).toEqual(object)
  })
})
