import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import React, { Suspense } from "react"
import { SWRConfig } from "swr"
import * as config from "../../config"
import MenuPrimary from "../components/MenuPrimary"
import Protected from "../components/Protected"
import { Spinner } from "../components/ui/Spinner"
import "../styles/globals.css"

const isServer = () => typeof window === "undefined"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isPageAdmin = router.pathname.includes("admin")
  const isPagePublic = config.pages.public.some((regexp) =>
    RegExp(regexp).test(router.asPath)
  )

  // Disable NextJS SSR so we can use Suspense,
  // as ReactDOMServer does not yet support Suspense.
  if (isServer()) return null

  return (
    <>
      <SWRConfig value={{ suspense: true }}>
        <div className="mb-6">
          {isPagePublic ? (
            <Component {...pageProps} />
          ) : (
            <Suspense fallback={<Spinner />}>
              <Protected>
                <div className="animate-fadein-fast">
                  <Suspense fallback={<Spinner />}>
                    <MenuPrimary />
                  </Suspense>

                  <Suspense fallback={<Spinner />}>
                    <div className="container mx-auto">
                      <Component {...pageProps} />
                    </div>
                  </Suspense>
                </div>
              </Protected>
            </Suspense>
          )}
        </div>
      </SWRConfig>

      <style jsx global>
        {`
          body {
            background-repeat: no-repeat;
            background-attachment: fixed;
            ${isPageAdmin
              ? "background-image: linear-gradient(0deg, rgba(235,197,197,1) 0%, rgba(200,200,223,1) 100%);"
              : "background-image: linear-gradient(0deg, rgba(280,280,280,1) 0%, rgba(200,200,223,1) 100%);"}
          }
        `}
      </style>
    </>
  )
}
