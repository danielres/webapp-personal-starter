import ui from "./ui.module.css"

type TableOuterProps = {
  children: React.ReactNode
  className?: string
  headers?: string[]
}

export function TableOuter({ className, children, headers }: TableOuterProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`${ui.TableOuter} ${className}`}>
        {headers && (
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={`${header}-${i}`}>{header}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
