import '../styles/reset.css'
import type { AppProps } from 'next/app'
import {wrapper} from "../store";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>

  )
}

export default wrapper.withRedux(MyApp)
