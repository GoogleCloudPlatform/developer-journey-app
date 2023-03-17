import styles from 'src/styles/Mission.module.css'
import Image from 'next/image'
import { RootState } from '../redux/store'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { GridPosition } from 'src/models/GridPosition';
import { collectItem, startMission } from 'src/redux/gameSlice';
import { setUser } from 'src/redux/userSlice';
import { User } from 'src/models/User';

export default function Component({ x, y }: GridPosition) {
  const dispatch = useAppDispatch()

  const { playerPosition, mission, inventory } = useAppSelector((state: RootState) => state.game)
  const playerIsOnTile = playerPosition.x === x && playerPosition.y === y;
  const tileIsFinalTile = x == 2 && y == 2;

  const tileItem = inventory.find(item => item.position.x === x && item.position.y === y && item.status === 'NOT_COLLECTED');
  const allItemsCollected = inventory.length > 0 && inventory.every(item => item.status === 'COLLECTED');

  const completeMission = () => {
    if (allItemsCollected) {
      fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(mission),
      }).then((response) => response.json())
        .then((user: User) => {
          dispatch(setUser(user))
          dispatch(startMission({ user, nextMission: true }))
        })
        .catch(error => {
          console.error('/api/user POST request did not work.', { error })
        })
    }
  }

  return (
    <section className={styles.tile}>
      {playerIsOnTile && 'X'}
      {tileItem && (
        <Image
          src={`./google-cloud-icons/${tileItem.title}.svg`}
          alt={`icon of ${tileItem.title}`}
          width='30'
          height='30'
        />
      )}
      {playerIsOnTile && tileItem && (
        <button onClick={() => dispatch(collectItem())}>
          Collect Item {tileItem.title}
        </button>
      )}
      {allItemsCollected && tileIsFinalTile && (
        <button disabled={!playerIsOnTile} onClick={completeMission}>
          Complete Mission
        </button>
      )}
    </section>
  )
}
