type StackProps = {
  children: React.ReactNode
  className?: string
  spacing?: "xs" | "sm" | "md" | "lg"
}

export function Stack({
  children,
  className = "",
  spacing = "md",
}: StackProps) {
  return (
    <>
      <div className={`stack-${spacing} ${className}`}>{children}</div>

      <style jsx>{`
        .stack-xs :global(> * + *) {
          margin-top: 0.5rem;
        }

        .stack-sm :global(> * + *) {
          margin-top: 1rem;
        }

        .stack-md :global(> * + *) {
          margin-top: 1.5rem;
        }

        .stack-lg :global(> * + *) {
          margin-top: 2rem;
        }
      `}</style>
    </>
  )
}
