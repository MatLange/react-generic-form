import "../styles/tailwind.css"
import "../styles/netdna.bootstrapcdn.com_bootstrap_4.5.2_css_bootstrap.min.css"
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
        <Component {...pageProps} />
  )
}

export default MyApp
