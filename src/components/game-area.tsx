import Head from 'next/head'
import styles from 'src/styles/Home.module.css'
import Link from 'next/link';

// Components
import Mission from "../components/mission";
import LoginBtn from "../components/login-btn";

export default function Home() {
  return (
    <>
      <Head>
        <title>Developer Journey App</title>
        <meta name="description" content="Google Cloud Developer Journey App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper}>
        <header className={styles.header}>
        Developer Journey App
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
