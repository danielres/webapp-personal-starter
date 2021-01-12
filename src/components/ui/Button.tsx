import classnames from "classnames"
import ui from "./ui.module.css"

type ButtonProps = {
  as?: "button" | "a"
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  padding?: "md" | "none"
  type?: "button" | "submit"
  variant?: "primary" | "secondary" | "action" | "text" | "custom"
}

export function Button({
  as = "button",
  children,
  className,
  href,
  padding = "md",
  type,
  variant,
  onClick,
}: ButtonProps) {
  const Component = as

  return (
    <Component
      className={classnames(
        {
          [ui.btn_primary]: variant === "primary",
          [ui.btn_secondary]: variant === "secondary",
          [ui.btn_text]: variant === "text",
          [ui.btn_md]: padding === "md",
        },
        className
      )}
      href={href}
      onClick={onClick}
      type={type ?? (as === "button" ? "button" : undefined)}
    >
      {children}
    </Component>
  )
}
