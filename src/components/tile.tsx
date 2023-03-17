import styles from 'src/styles/Mission.module.css'
import { RootState } from '../redux/store'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { GridPosition } from 'src/models/GridPosition';
import { nextMission } from 'src/redux/missionSlice';
import { setPlayerPosition } from 'src/redux/playerPositionSlice';

export default function Component({ x, y }: GridPosition) {
  const dispatch = useAppDispatch()

  const playerPosition = useAppSelector((state: RootState) => state.playerPosition)
  const playerIsOnTile = playerPosition.x === x && playerPosition.y === y;
  const tileIsFinalTile = x == 2 && y == 2;

  const completeMission = () => {
    dispatch(nextMission())
    dispatch(setPlayerPosition({x: 0, y: 0}))
  }

  return (
    <section className={styles.tile}>
      {playerIsOnTile && 'X'}
      {playerIsOnTile && tileIsFinalTile && (
        <button onClick={(completeMission)}>
          Complete Mission
        </button>
      )}
    </section>
  )
}
