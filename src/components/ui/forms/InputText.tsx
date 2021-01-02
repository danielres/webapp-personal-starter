import { useFormContext } from "react-hook-form"

type InputTextProps = {
  id?: string
  name: string
  placeholder?: string
  required?: boolean
  validate?: (value: string) => boolean | string
}

export function InputText({ id, name, placeholder, validate }: InputTextProps) {
  const { register, errors } = useFormContext()

  return (
    <>
      <input
        className="w-full border-gray-300 rounded"
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
