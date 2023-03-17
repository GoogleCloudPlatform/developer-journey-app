import Head from 'next/head'
import styles from 'src/styles/Home.module.css'

// Components
import Header from "../components/header";
import PromptPanel from "../components/prompt-panel";
import TileBoard from "../components/tile-board";
import GameControls from "../components/game-controls";
import Inventory from "../components/inventory";
import Footer from "../components/footer";

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
        <PromptPanel />
        <TileBoard />
        <GameControls />
        <Inventory />
        <Footer />
      </main>
    </>
  )
}
