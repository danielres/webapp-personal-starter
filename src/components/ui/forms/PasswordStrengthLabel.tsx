import classnames from "classnames"

export const PasswordStrengthLabel = ({
  value,
}: {
  value: 0 | 1 | 2 | 3 | 4
}) => {
  const colors = [
    "text-transparent",
    "text-red-700",
    "text-yellow-700",
    "text-green-500",
    "text-green-700",
  ]

  return (
    <div className={classnames("relative w-full", colors[value])}>
      <span className="absolute right-0">
        {["weak", "weak", "fair", "good", "strong"][value]}
      </span>
    </div>
  )
}
