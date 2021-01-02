import type { AppProps } from "next/app"
import MenuPrimary from "../components/MenuPrimary"
import Protected from "../components/Protected"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Protected>
        <MenuPrimary />
        <Component {...pageProps} />
      </Protected>
    </div>
  )
}
