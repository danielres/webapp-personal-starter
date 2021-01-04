type InputErrorProps = {
  error?: {
    message?: string
  }
}

export function InputError({ error }: InputErrorProps) {
  if (error?.message)
    return (
      <div className="mt-1 text-sm text-red-700 opacity-75">
        {error.message}
      </div>
    )
  return null
}
