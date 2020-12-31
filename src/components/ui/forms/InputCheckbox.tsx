import { useFormContext } from "react-hook-form"

type InputCheckboxProps = {
  name: string
  id?: string
}
export function InputCheckbox({ name, id }: InputCheckboxProps) {
  const { register, errors } = useFormContext()

  return (
    <>
      <input type="checkbox" name={name} id={id} ref={register()} />
      {errors?.[name] && <div>{errors[name].message}</div>}
    </>
  )
}
