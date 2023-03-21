import { useSession, } from "next-auth/react"

// Components
import Header from "../components/header";
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
        <Header />
        {status === "authenticated" && (
          <MissionHistory />
        )}
      </main>
    </>
  )
}
