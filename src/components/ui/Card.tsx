type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`p-6 sm:p-8 bg-white sm:rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  )
}
