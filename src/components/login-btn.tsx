import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import { User } from "src/models/User";
import { useAppDispatch } from "src/redux/hooks";
import { setUser } from "src/redux/userSlice";

// Make the `request` function generic
// to specify the return data type:
function request<TResponse>(
  url: string,
  // `RequestInit` is a type for configuring 
  // a `fetch` request. By default, an empty object.
  config: RequestInit = {}

  // This function is async, it will return a Promise:
): Promise<User> {

  // Inside, we call the `fetch` function with 
  // a URL and config given:
  return fetch(url, config)
    // When got a response call a `json` method on it
    .then((response) => response.json())
    // and return the result data.
    .then((data) => data as User);

  // We also can use some post-response
  // data-transformations in the last `then` clause.
}

export default function Component() {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  const fetchUser = () => {
    console.log('Fetching a user')
    request('/api/user').then((response) => {
      dispatch(setUser(response))
    }).catch(error => {
      console.log('/user did not work.', { error })
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
