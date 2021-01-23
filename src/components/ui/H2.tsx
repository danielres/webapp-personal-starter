type H2Props = {
  children: React.ReactNode
  className?: string
}

export function H2({ children, className }: H2Props) {
  return <h2 className={`text-xl ${className}`}>{children}</h2>
}
