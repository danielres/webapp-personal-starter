import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import MenuPrimary from "../components/MenuPrimary"
import Protected from "../components/Protected"
import * as config from "../../config"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isPageAdmin = router.pathname.includes("admin")
  const isPagePublic = config.pages.public.some((regexp) =>
    RegExp(regexp).test(router.asPath)
  )

  return (
    <>
      <div className="mb-6">
        {isPagePublic ? (
          <Component {...pageProps} />
        ) : (
          <Protected>
            <div className="animate-fadein-slow">
              <MenuPrimary />

              <div className="container mx-auto">
                <Component {...pageProps} />
              </div>
            </div>
          </Protected>
        )}
      </div>

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
