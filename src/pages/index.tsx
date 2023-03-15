import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from 'src/styles/Home.module.css'
import Link from 'next/link';


import Mission from "../components/mission";
import LoginBtn from "../components/login-btn";

export default function Home() {
  return (
    <>
      <Head>
        <title>Birds of Paradise</title>
        <meta name="description" content="Google Cloud head start app for JavaScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper}>
        <header className={styles.header}>
          Google Cloud head start app for JavaScript - Developer App Journey
        </header>
        <Mission />
        <div>
          <LoginBtn />
        </div>
        <div>
          <Link href="/secure-page-example">Secure page example</Link>
        </div>
      </main>
    </>
  )
}
