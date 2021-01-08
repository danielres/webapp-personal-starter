import classnames from "classnames"

type AlertProps = {
  children: React.ReactNode
  variant: "danger" | "info" | "success"
}

export function Alert({ children, variant }: AlertProps) {
  return (
    <div
      className={classnames("p-4 rounded-lg border-solid border", {
        "bg-red-50 text-red-800 border-red-200": variant === "danger",
        "bg-blue-50 text-blue-800 border-blue-200": variant === "info",
        "bg-green-50 text-green-800 border-green-200": variant === "success",
      })}
    >
      {children}
    </div>
  )
}
