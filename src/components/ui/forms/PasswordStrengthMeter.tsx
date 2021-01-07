import classnames from "classnames"

type PasswordStrengthMeterProps = {
  value: 0 | 1 | 2 | 3 | 4
}

const colors = [
  "bg-transparent",
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-300",
  "bg-green-500",
]

export const PasswordStrengthMeter = ({
  value,
}: PasswordStrengthMeterProps) => {
  return (
    <div className={classnames("flex h-1 rounded bg-gray-200")}>
      <div
        style={{ width: `${(100 / 4) * value}%` }}
        className={colors[value]}
      ></div>
    </div>
  )
}
