import ui from "./ui.module.css"

type StackProps = {
  children: React.ReactNode
  className?: string
}

export function Stack({ children, className }: StackProps) {
  return <div className={`${ui.Stack} ${className}`}>{children}</div>
}
