import styles from 'src/styles/Mission.module.css'
import { RootState } from '../redux/store'
import { useAppSelector } from '../redux/hooks'
import { GridPosition } from 'src/models/GridPosition';

export default function Component({ x, y }: GridPosition) {

  const playerPosition = useAppSelector((state: RootState) => state.playerPosition)
  const playerIsOnTile = playerPosition.x === x && playerPosition.y === y;

  return (
    <section className={styles.tile}>
      {playerIsOnTile && 'X'}
    </section>
  )
}
