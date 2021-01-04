import { useFormContext } from "react-hook-form"
import classnames from "classnames"
import { InputError } from "./InputError"

type InputTextProps = {
  id?: string
  name: string
  placeholder?: string
  required?: boolean
  validate?: (value: string) => boolean | string
  type?: "text" | "password"
}

export function InputText({
  id,
  name,
  placeholder,
  validate,
  type = "text",
}: InputTextProps) {
  const { register, errors } = useFormContext()

  const hasError = errors?.[name]

  return (
    <>
      <input
        className={classnames(
          "w-full border-gray-300 rounded",
          hasError ? "border-red-400" : "border-gray-300 placeholder-gray-400"
        )}
        id={id}
        name={name}
        placeholder={hasError ? undefined : placeholder || name}
        ref={register({ validate })}
        type={type}
      />
      <InputError error={errors[name]} />
    </>
  )
}
