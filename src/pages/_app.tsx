import 'src/styles/globals.css';
import {SessionProvider} from 'next-auth/react';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import Head from 'next/head';
import Navbar from 'src/components/navbar';
import Footer from 'src/components/footer';

export default function App({
  Component,
  pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <div className="flex flex-col h-screen justify-between">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </div>
        </Provider>
      </SessionProvider>
    </>
  );
};
