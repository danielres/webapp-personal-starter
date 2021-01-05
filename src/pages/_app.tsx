import type { AppProps } from "next/app"
import MenuPrimary from "../components/MenuPrimary"
import Protected from "../components/Protected"
import { Card } from "../components/ui/Card"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Protected>
        <div className="animate-fadein-slow">
          <MenuPrimary />

          <div className="container mx-auto">
            <Component {...pageProps} />
          </div>
        </div>
      </Protected>
    </div>
  )
}
