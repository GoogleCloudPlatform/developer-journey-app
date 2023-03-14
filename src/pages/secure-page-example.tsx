import { useSession, getSession } from "next-auth/react"
import Link from "next/link";
import LoginBtn from "../components/login-btn";


export default function SecurePageExample() {
  const {data: session, status} = useSession();

  if (status === "unauthenticated") {
    return (
      <>
      <h1>Access Denied</h1>
        <div>
          <Link href="/">Home</Link>
        </div>
      </>
    )
  }

  return (
      <>
        <h1>You are authorized to see this page</h1>
        <div>
          {JSON.stringify(session)}
        </div>
        <div>
          <Link href="/">Home</Link>
        </div>
      </>
  )
}
