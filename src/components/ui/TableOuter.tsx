import classnames from "classnames"

type TableOuterProps = {
  children: React.ReactNode
  className?: string
  headers?: string[]
}

export function TableOuter({ className, children, headers }: TableOuterProps) {
  return (
    <>
      <div className="overflow-x-auto TableOuter">
        <table className={classnames("w-full text-left", className)}>
          {headers && (
            <thead className="border-b-2 border-gray-300">
              <tr>
                {headers.map((header, i) => (
                  <th className="text-gray-400" key={`${header}-${i}`}>
                    {header}
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
        `}
      </style>
    </>
  )
}
