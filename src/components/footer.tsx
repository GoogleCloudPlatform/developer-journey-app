import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import styles from 'src/styles/Mission.module.css'

export default function Component() {
  const user = useAppSelector((state: RootState) => state.user)

  return (
    <footer className={styles.footer}>
      Completed Missions:
      {' '}
      {user.completedMissions.join(', ')}
    </footer>
  )
}




