import { useSession, } from "next-auth/react"

// Components
import Header from "../components/header";
import MissionHistory from "src/components/mission-history";

export default function Home() {
  const { status } = useSession();
  return (
    <main>
      <Header />
      {status === "authenticated" && (
        <MissionHistory />
      )}
    </main>
  )
}
