import Head from 'next/head'
import styles from 'src/styles/Home.module.css'

// Components
import Mission from "../components/mission";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Developer Journey App</title>
        <meta name="description" content="Google Cloud Developer Journey App for JavaScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper}>
        <Header />
        <Mission />
      </main>
    </>
  )
}
