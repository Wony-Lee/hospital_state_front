import '../styles/reset.css'
import type { AppProps } from 'next/app'
import {wrapper} from "../store/reducers";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
