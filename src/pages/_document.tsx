import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Google Cloud Developer Journey App for JavaScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className='bg-slate-700'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
