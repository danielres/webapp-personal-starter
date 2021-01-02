import ui from "./ui.module.css"

type StackProps = {
  children: React.ReactNode
}

export function Stack({ children }: StackProps) {
  return <div className={ui.Stack}>{children}</div>
}
