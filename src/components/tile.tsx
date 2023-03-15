import styles from 'src/styles/Mission.module.css'
import { RootState } from '../redux/store'
import { useAppSelector } from '../redux/hooks'

export default function Component({ x, y }) {

  const playerPosition = useAppSelector((state: RootState) => state.playerPosition)
  const playerIsOnTile = playerPosition.x.toString() === x && playerPosition.y.toString() === y;

  return (
    <section className={styles.tile}>
      {playerIsOnTile && 'X'}
    </section>
  )
}
