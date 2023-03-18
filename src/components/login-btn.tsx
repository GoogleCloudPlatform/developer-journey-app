import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import { useGetUserQuery } from "src/redux/apiSlice";
import { startMission } from "src/redux/gameSlice";
import { useAppDispatch } from "src/redux/hooks";
import { setUser } from "src/redux/userSlice";

export default function Component() {
  const dispatch = useAppDispatch()

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();

  useEffect(() => {
    if(user) {
      dispatch(setUser(user))
      dispatch(startMission({ user }))
    } else {
      dispatch(setUser({ email: '', completedMissions: [] }))
    }
  }, [dispatch, user?.email]);

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isSuccess) {
    if (user.email) {
      return (
        <>
          Signed in as {JSON.stringify(user.email)} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  } else if (isError) {
    return <div>{error.toString()}</div>
  }
}
