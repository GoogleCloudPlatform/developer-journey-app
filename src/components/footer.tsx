import styles from 'src/styles/Mission.module.css'
import { useGetUserQuery } from 'src/redux/apiSlice'


export default function Component() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isSuccess) {
    return (
      <footer className={styles.footer}>
        {user.completedMissions.length}
        {' '}
        Completed Missions:
        {' '}
        {user.completedMissions.join(', ')}
      </footer>
    )
  } else if (isError) {
    return <div>{error.toString()}</div>
  }

  // TODO: Better fall through logic, but can't return 'Element | undefined'
  return <div>Something has gone terribly wrong with footer.tsx</div>
}



