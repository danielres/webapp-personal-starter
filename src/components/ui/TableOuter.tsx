import classnames from "classnames"
import { Button } from "./Button"

type TableOuterProps = {
  children: React.ReactNode
  className?: string
  headers?: {
    field: string | null
    label: string | null
  }[]
  onFieldClick: (fieldName: string) => void
}

export function TableOuter({
  className,
  children,
  headers,
  onFieldClick,
}: TableOuterProps) {
  return (
    <>
      <div className="overflow-x-auto TableOuter">
        <table className={classnames("w-full text-left", className)}>
          {headers && (
            <thead className="border-b-2 border-gray-300">
              <tr>
                {headers.map((header, i) => (
                  <th key={`${header.field}-${i}`}>
                    <Button
                      className="font-bold text-gray-400"
                      onClick={() => header.field && onFieldClick(header.field)}
                      padding="none"
                      variant="text"
                    >
                      {header.label}
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>{children}</tbody>
        </table>
      </div>

      <style jsx>
        {`
          .TableOuter :global(td),
          .TableOuter :global(th) {
            @apply p-1;
          }
          .TableOuter :global(tbody tr) {
            @apply hover:bg-gray-100;
          }
        `}
      </style>
    </>
  )
}
