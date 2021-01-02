import classnames from "classnames"

type ButtonProps = {
  children: React.ReactNode
  type: "button" | "submit"
  variant?: "primary" | "secondary"
}

export function Button({ children, type = "button", variant }: ButtonProps) {
  return (
    <button
      className={classnames("px-3 py-2 rounded", {
        "bg-blue-400 text-white font-semibold": variant === "primary",
      })}
      type={type}
    >
      {children}
    </button>
  )
}
