import { useSession, } from "next-auth/react"

// Components
import PromptPanel from "../components/prompt-panel";
import TileBoard from "../components/tile-board";
import GameControls from "../components/game-controls";
import Inventory from "../components/inventory";
import Footer from "../components/footer";
import Head from "next/head";
import Navbar from "src/components/navbar";
import SignInRecommendation from "src/components/SignInRecommendation";

export default function Home() {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>Home | Developer Journey App</title>
      </Head>
      <Navbar />
      <main className="">
        {status === "authenticated" ? (
          <>
            <div className="grid grid-cols-5 gap-3">
              <PromptPanel />
              <TileBoard />
              <GameControls />
              <Inventory />
            </div>
            <Footer />
          </>
        ) : (<SignInRecommendation />)}
      </main>
    </>
  )
}
