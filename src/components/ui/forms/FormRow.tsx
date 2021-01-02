type FormRowProps = {
  children: React.ReactNode
  label?: String
}

export function FormRow({ children, label }: FormRowProps) {
  return (
    <>
      <label className="block">
        {label && <span className="text-gray-500 font-semibold">{label}</span>}
        {children}
      </label>
    </>
  )
}
