import classnames from "classnames"
import ui from "./ui.module.css"

type ButtonProps = {
  as?: "button" | "a"
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: "button" | "submit"
  variant?: "primary" | "secondary" | "action"
}

export function Button({
  as = "button",
  children,
  href,
  type,
  variant,
  onClick,
}: ButtonProps) {
  const Component = as

  return (
    <Component
      className={classnames({
        [ui.btn_primary]: variant === "primary",
        [ui.btn_action]: variant === "action",
      })}
      href={href}
      onClick={onClick}
      type={type ?? (as === "button" ? "button" : undefined)}
    >
      {children}
    </Component>
  )
}
