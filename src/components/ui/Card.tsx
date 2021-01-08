type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`p-8 bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  )
}
