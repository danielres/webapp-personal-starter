import classnames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"

type TabsProps = {
  children: React.ReactNode
}

export function Tabs({ children }: TabsProps) {
  return <div className={classnames("px-8 font-bold")}>{children}</div>
}

type TabProps = {
  children: React.ReactNode
  href: string
}

export function Tab({ children, href }: TabProps) {
  const router = useRouter()
  const isActive = router.pathname.includes(href)

  return (
    <Link href={href} passHref>
      <a
        className={classnames(
          "inline-block px-4 pt-2 pb-1 mr-3 text-gray-500 bg-white shadow-md rounded-t-md transition-opacity",
          { "opacity-50 hover:opacity-75": !isActive }
        )}
      >
        {children}
      </a>
    </Link>
  )
}
