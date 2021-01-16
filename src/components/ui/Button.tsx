import classnames from "classnames"

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
        "inline-block transition-colors rounded cursor-pointer focus:outline-none",
        {
          "font-semibold text-white bg-blue-400": variant === "primary",
          "bg-gray-200": variant === "secondary",
          "text-gray-500 hover:underline hover:text-gray-700":
            variant === "text",
          "px-3 py-2": padding === "md",
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
