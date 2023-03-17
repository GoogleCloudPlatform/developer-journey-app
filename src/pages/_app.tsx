import 'src/styles/globals.css'
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

export default function App({
  Component,
  pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};
