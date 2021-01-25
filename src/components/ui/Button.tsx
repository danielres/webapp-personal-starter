import classnames from "classnames"

type ButtonProps = {
  as?: "button" | "a"
  children: React.ReactNode
  className?: string
  disabled?: boolean
  href?: string
  onClick?: () => void
  padding?: "md" | "none"
  title?: string
  type?: "button" | "submit"
  variant?: "primary" | "secondary" | "action" | "text" | "custom"
}

export function Button({
  as = "button",
  children,
  className,
  disabled = false,
  href,
  padding = "md",
  title,
  type,
  variant,
  onClick,
}: ButtonProps) {
  const Component = as

  return (
    <Component
      className={classnames(
        "inline-block rounded cursor-pointer focus:outline-none outline-none transition-all",
        {
          "font-semibold text-white bg-blue-400": variant === "primary",
          "bg-gray-200": variant === "secondary",
          "text-gray-500 hover:underline hover:text-gray-700":
            variant === "text",
          "px-3 py-2": padding === "md",
          "opacity-90 hover:opacity-100": !disabled,
          "pointer-events-none opacity-25": disabled,
        },
        className
      )}
      href={href}
      onClick={onClick}
      title={title}
      type={type ?? (as === "button" ? "button" : undefined)}
    >
      {children}
    </Component>
  )
}
