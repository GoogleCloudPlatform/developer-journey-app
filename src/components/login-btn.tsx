import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
          <hr/>
          <div>
            {JSON.stringify(session)}
          </div>
        </>
    )
  }
  return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
        <hr/>
        <div>
          {JSON.stringify(session)}
        </div>
      </>
  )
}
