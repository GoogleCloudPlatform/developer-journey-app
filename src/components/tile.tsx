import styles from 'src/styles/Mission.module.css'
import { RootState } from '../redux/store'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { GridPosition } from 'src/models/GridPosition';
import { nextMission } from 'src/redux/missionSlice';
import { setPlayerPosition } from 'src/redux/playerPositionSlice';
import { setUser } from 'src/redux/userSlice';
import { User } from 'src/models/User';

export default function Component({ x, y }: GridPosition) {
  const dispatch = useAppDispatch()

  const mission = useAppSelector((state: RootState) => state.mission)
  const playerPosition = useAppSelector((state: RootState) => state.playerPosition)
  const playerIsOnTile = playerPosition.x === x && playerPosition.y === y;
  const tileIsFinalTile = x == 2 && y == 2;

  const completeMission = () => {
    dispatch(nextMission())
    dispatch(setPlayerPosition({ x: 0, y: 0 }))
    fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(mission),
    }).then((response) => response.json())
      .then((data: User) => dispatch(setUser(data)))
      .catch(error => {
        console.error('/api/user POST request did not work.', { error })
      })
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
