import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import MenuPrimary from "../components/MenuPrimary"
import Protected from "../components/Protected"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isAdmin = router.pathname.includes("admin")

  return (
    <>
      <div className="mb-6">
        <Protected>
          <div className="animate-fadein-slow">
            <MenuPrimary />

            <div className="container mx-auto">
              <Component {...pageProps} />
            </div>
          </div>
        </Protected>
      </div>

      <style jsx global>
        {`
          body {
            background-repeat: no-repeat;
            background-attachment: fixed;
            ${isAdmin
              ? "background-image: linear-gradient(0deg, rgba(235,197,197,1) 0%, rgba(200,200,223,1) 100%);"
              : "background-image: linear-gradient(0deg, rgba(280,280,280,1) 0%, rgba(200,200,223,1) 100%);"}
          }
        `}
      </style>
    </>
  )
}
