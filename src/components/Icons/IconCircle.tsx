import classnames from "classnames"

type IconCircleProps = {
  children: React.ReactNode
  className?: string
  variant?: "danger" | "info" | "success"
}

export function IconCircle({
  children,
  className = "",
  variant,
}: IconCircleProps) {
  return (
    <div
      className={classnames(
        "flex-shrink-0 w-10 h-10 p-1 rounded-full md:w-12 md:h-12",
        {
          "bg-red-200 text-red-800": variant === "danger",
          "bg-blue-200 text-blue-800": variant === "info",
          "bg-green-200 text-green-800": variant === "success",
        },
        className
      )}
    >
      <div className="opacity-50">{children}</div>
    </div>
  )
}
