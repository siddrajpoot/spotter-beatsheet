import { type AppType } from 'next/dist/shared/lib/utils'

import { MantineProvider } from '@mantine/core'
import Head from 'next/head'

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
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

export default MyApp
