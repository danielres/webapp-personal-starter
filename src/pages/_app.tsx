import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import React, { Suspense } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SWRConfig } from "swr"
import * as config from "../../config"
import { MenuAdmin } from "../components/admin/MenuAdmin"
import MenuPrimary from "../components/MenuPrimary"
import Protected from "../components/Protected"
import { SuperUserOnly } from "../components/SuperUserOnly"
import { Container } from "../components/ui/Container"
import { Spinner } from "../components/ui/Spinner"
import { Stack } from "../components/ui/Stack"
import "../styles/globals.css"

const isServer = () => typeof window === "undefined"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isPageAdmin = router.pathname.includes("/admin")
  const isPagePublic = config.pages.public.some((regexp) =>
    RegExp(regexp).test(router.asPath)
  )

  // Disable NextJS SSR so we can use Suspense,
  // as ReactDOMServer does not yet support Suspense.
  if (isServer()) return null

  return (
    <>
      <ToastContainer
        autoClose={6000}
        hideProgressBar
        newestOnTop
        pauseOnHover
        position="bottom-right"
      />

      <div id="modal-root"></div>

      <SWRConfig value={{ suspense: true }}>
        <div className="mb-6">
          {isPagePublic ? (
            <Suspense fallback={<Spinner />}>
              <Component {...pageProps} />
            </Suspense>
          ) : (
            <Suspense fallback={<Spinner />}>
              <Protected>
                <div className="animate-fadein-fast">
                  <Stack>
                    <Suspense fallback={<Spinner />}>
                      <MenuPrimary className="relative z-20" />
                    </Suspense>

                    <Suspense fallback={<Spinner />}>
                      <Container>
                        {isPageAdmin ? (
                          <SuperUserOnly silent={false}>
                            <MenuAdmin />
                            <div className="relative z-10">
                              <Component {...pageProps} />
                            </div>
                          </SuperUserOnly>
                        ) : (
                          <Component {...pageProps} />
                        )}
                      </Container>
                    </Suspense>
                  </Stack>
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
