import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import { User } from "src/models/User";
import { startMission } from "src/redux/gameSlice";
import { useAppDispatch } from "src/redux/hooks";
import { setUser } from "src/redux/userSlice";

export default function Component() {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  const fetchUser = () => {
    console.log('Fetching a user')
    fetch('/api/user')
      .then((response) => response.json())
      .then((user: User) => {
        dispatch(setUser(user))
        dispatch(startMission({ user }))
      })
      .catch(error => {
        console.error('/api/user GET request did not work.', { error })
      })
  }

  useEffect(fetchUser, []);

  const signInAndGetUser = () => {
    signIn().then(fetchUser)
  }

  const signOutAndForgetUser = () => {
    signOut().then(() => {
      dispatch(setUser({ email: '', completedMissions: [] }))
    })
  }


  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOutAndForgetUser()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signInAndGetUser()}>Sign in</button>
    </>
  )
}
