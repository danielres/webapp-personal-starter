import classnames from "classnames"

type ContainerProps = {
  children: React.ReactNode
  className?: string
  variant?: "dialog" | "standard"
}

export function Container({
  children,
  className = "",
  variant = "standard",
}: ContainerProps) {
  return (
    <div
      className={classnames(className, {
        "w-full mx-auto mt-8 sm:max-w-lg": variant === "dialog",
        "container sm:mx-auto": variant === "standard",
      })}
    >
      {children}
    </div>
  )
}
