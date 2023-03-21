import { useSession, } from "next-auth/react"

// Components
import SignInRecommendation from "../components/sign-in-recommendation";
import MissionHistory from "src/components/mission-history";
import Head from "next/head";
import Navbar from "src/components/navbar";

export default function MissionHistoryPage() {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>Mission History | Developer Journey App</title>
      </Head>
      <main>
        <Navbar />
        {status === "authenticated" ? (

          <div className="grid grid-cols-12 gap-3">
            <MissionHistory />
          </div>
        ) : (<SignInRecommendation />)}
      </main>
    </>
  )
}
