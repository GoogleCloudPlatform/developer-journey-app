import { useSession, } from "next-auth/react"

// Components
import Header from "../components/header";
import MissionHistory from "src/components/mission-history";
import Head from "next/head";

export default function Home() {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>Mission History | Developer Journey App</title>
      </Head>
      <main>
        <Header />
        {status === "authenticated" && (
          <MissionHistory />
        )}
      </main>
    </>
  )
}
