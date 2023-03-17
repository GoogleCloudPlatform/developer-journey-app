import { useSession, } from "next-auth/react"
import styles from 'src/styles/Home.module.css'

// Components
import Header from "../components/header";
import PromptPanel from "../components/prompt-panel";
import TileBoard from "../components/tile-board";
import GameControls from "../components/game-controls";
import Inventory from "../components/inventory";
import Footer from "../components/footer";
import Head from "next/head";

export default function Home() {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>Home | Developer Journey App</title>
      </Head>
      <main className={styles.wrapper}>
        <Header />
        {status === "authenticated" && (
          <>
            <PromptPanel />
            <TileBoard />
            <GameControls />
            <Inventory />
            <Footer />
          </>
        )}
      </main>
    </>
  )
}
