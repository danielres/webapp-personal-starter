import * as object from "./object"

describe("crypto", () => {
  it("encrypts/decrypts an object into an url-friendly string", () => {
    const obj = { foo: "Foo", bar: { bar: "bar" } }

    const encrypted = object.encrypt(obj)
    const decrypted = object.decrypt(encrypted)

    expect(typeof encrypted).toEqual("string")
    expect(encrypted.length > 20).toEqual(true)
    expect(decrypted).toEqual(obj)
  })
})
