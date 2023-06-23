import { type AppType } from 'next/dist/shared/lib/utils'

import { MantineProvider } from '@mantine/core'
import Head from 'next/head'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        {/* <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style> */}
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          fontFamily: inter.style.fontFamily,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

export default MyApp
