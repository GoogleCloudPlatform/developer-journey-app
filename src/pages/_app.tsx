/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import 'src/styles/globals.css'
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Head from 'next/head';
import Navbar from 'src/components/navbar';
import Footer from 'src/components/footer';

export default function App({
  Component,
  pageProps: { session, ...pageProps } }: AppProps) {
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
