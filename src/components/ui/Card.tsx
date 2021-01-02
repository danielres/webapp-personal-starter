type CardProps = {
  children: React.ReactNode
}

export function Card({ children }: CardProps) {
  return <div className="bg-white rounded-lg shadow p-8">{children}</div>
}
