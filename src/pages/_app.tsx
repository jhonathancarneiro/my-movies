import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/Auth'

export default function App({ Component, pageProps }: AppProps) {
  return(

  <ChakraProvider>
    <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
  </ChakraProvider>)
}
