type H1Props = {
  children: React.ReactNode
  className?: string
}

export function H1({ children, className }: H1Props) {
  return <h1 className={`text-2xl ${className}`}>{children}</h1>
}
