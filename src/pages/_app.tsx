import type { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import MenuPrimary from "../components/MenuPrimary"
import Protected from "../components/Protected"
import "../styles/globals.css"

const globalStylesAdmin = `
  body {
    background-image: linear-gradient(0deg, rgba(200,200,223,1) 0%, rgba(235,197,197,1) 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isAdmin = router.pathname.includes("admin")

  return (
    <>
      <Head>{isAdmin && <style>{globalStylesAdmin}</style>}</Head>

      <div>
        <Protected>
          <MenuPrimary />

        <div className="container mx-auto">
          <Component {...pageProps} />
          </div>
        </Protected>
      </div>
    </>
  )
}
