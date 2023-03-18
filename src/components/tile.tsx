import styles from 'src/styles/Mission.module.css'
import Image from 'next/image'
import { RootState } from '../redux/store'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { GridPosition } from 'src/models/GridPosition';
import { collectItem, startMission } from 'src/redux/gameSlice';
import { useAddCompletedMissionMutation, useGetUserQuery } from 'src/redux/apiSlice'


export default function Component({ x, y }: GridPosition) {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery();

  const [addCompletedMission, { isLoading: isSaving }] = useAddCompletedMissionMutation()
  
  const dispatch = useAppDispatch()

  const { playerPosition, mission, inventory, allItemsCollected } = useAppSelector((state: RootState) => state.game)
  const playerIsOnTile = playerPosition.x === x && playerPosition.y === y;
  const tileIsFinalTile = x == 2 && y == 2;

  const tileItem = inventory.find(item => item.position.x === x && item.position.y === y && item.status === 'NOT_COLLECTED');


  const completeMission = async () => {
    if (allItemsCollected && user) {
      addCompletedMission({ mission }).unwrap()
        .then(() => {
          dispatch(startMission({ user, nextMission: true }))
        })
        .catch(error => {
          console.error('addCompletedMission request did not work.', { error })
        })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isSuccess) {
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
          <button disabled={!playerIsOnTile || isSaving} onClick={completeMission}>
            {isSaving ? 'Saving...' : 'Complete Mission'}
          </button>
        )}
      </section>
    )
  } else if (isError) {
    return <div>{error.toString()}</div>
  }
}
