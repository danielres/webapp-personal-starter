import classnames from "classnames"

type IconInlinerProps = {
  children: React.ReactNode
  size?: number
  debug?: boolean
}

export const InlineIcon = ({
  children,
  size = 20,
  debug = false,
}: IconInlinerProps) => {
  return (
    <>
      <span
        className={classnames("relative inline-block", {
          "bg-red-200": debug,
        })}
      >
        <div
          className={classnames("absolute", {
            "bg-green-200": debug,
          })}
          style={{ width: "100%", height: "50%" }}
        >
          <div
            className="absolute opacity-60"
            style={{ bottom: 0, marginBottom: -size / 2 }}
          >
            {children}
          </div>
        </div>
        <div style={{ width: size }}>&nbsp;</div>
      </span>
    </>
  )
}
