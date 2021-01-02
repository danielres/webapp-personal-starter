import ui from "./ui.module.css"

type TableOuterProps = {
  children: React.ReactNode
  headers?: string[]
}

export function TableOuter({ children, headers }: TableOuterProps) {
  return (
    <table className={ui.TableOuter}>
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
  )
}
