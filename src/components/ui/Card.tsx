type CardProps = {
  children: React.ReactNode
}

export function Card({ children }: CardProps) {
  return <div className="p-8 bg-white rounded-lg shadow-md">{children}</div>
}
