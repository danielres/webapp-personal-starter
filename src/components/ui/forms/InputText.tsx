import { useFormContext } from "react-hook-form"
import ui from "../ui.module.css"

type InputTextProps = {
  id?: string
  name: string
  placeholder?: string
  required?: boolean
  validate?: (value: string) => boolean | string
}

export function InputText({
  id,
  name,
  placeholder,
  required = false,
  validate,
}: InputTextProps) {
  const { register, errors } = useFormContext()

  return (
    <>
      <input
        className={ui.InputText}
        id={id}
        name={name}
        placeholder={placeholder || name}
        ref={register({ validate })}
        type="text"
      />

      {errors?.[name] && <div>{errors[name].message}</div>}
    </>
  )
}
