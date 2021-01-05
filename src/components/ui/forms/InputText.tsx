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
          "w-full rounded focus:ring-2 placeholder-gray-400",
          hasError
            ? "border-red-400  focus:border-red-400  focus:ring-red-200"
            : "border-gray-400 focus:border-blue-400 focus:ring-blue-200"
        )}
        id={id}
        name={name}
        placeholder={hasError ? undefined : placeholder}
        ref={register({ validate })}
        type={type}
      />
      <InputError error={errors[name]} />
    </>
  )
}
