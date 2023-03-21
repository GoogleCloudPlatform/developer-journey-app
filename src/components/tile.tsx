import Image from 'next/image'
import { RootState } from '../redux/store'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { GridPosition } from 'src/models/GridPosition';
import { collectItem, setIsSavingMission, startMission } from 'src/redux/gameSlice';
import { useAddCompletedMissionMutation, useGetUserQuery } from 'src/redux/apiSlice'
import { useSession } from 'next-auth/react';


export default function Component({ x, y }: GridPosition) {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery();
  const { data: session } = useSession();

  const [addCompletedMission] = useAddCompletedMissionMutation()

  const dispatch = useAppDispatch()

  const { playerPosition, mission, inventory, allItemsCollected, isSavingMission } = useAppSelector((state: RootState) => state.game)
  const playerIsOnTile = playerPosition.x === x && playerPosition.y === y;
  const tileIsFinalTile = x == 2 && y == 2;

  const tileItem = inventory.find(item => item.position.x === x && item.position.y === y && item.status === 'NOT_COLLECTED');


  const completeMission = async () => {
    if (allItemsCollected && user) {
      dispatch(setIsSavingMission(true));
      return addCompletedMission({ mission }).unwrap()
        .then(() => {
          dispatch(startMission({ user, nextMission: true }))
        })
        .catch(error => {
          console.error('addCompletedMission request did not work.', { error })
        }).finally(() => {
          dispatch(setIsSavingMission(false));
        });
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{error.toString()}</div>
  }

  if (isSuccess) {
    return (
      <section className="min-h-full">
        <figure className="bg-slate-200 rounded-xl p-3">
          <div className="h-10 flex justify-between">
            {playerIsOnTile && session?.user?.image && (
              <img
                className="h-9 w-9 rounded-full float-left"
                src={session.user.image}
                alt=""
                referrerPolicy="no-referrer"
              />
            )}
            {tileItem && (
              <Image
                src={`./google-cloud-icons/${tileItem.title}.svg`}
                alt={`icon of ${tileItem.title}`}
                width='80'
                height='80'
                className='float-right'
              />
            )}
          </div>
          <div className="h-10">
            {playerIsOnTile && tileItem && (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                onClick={() => dispatch(collectItem())}
              >
                Collect
              </button>
            )}
            {allItemsCollected && tileIsFinalTile && (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                disabled={!playerIsOnTile || isSavingMission} onClick={completeMission}
              >
                {isSavingMission ? 'Saving...' : 'Complete Mission'}
              </button>
            )}
          </div>
        </figure>
      </section>
    )
  }

  // TODO: Better fall through logic, but can't return 'Element | undefined'
  return <div>Something has gone terribly wrong with tile.tsx</div>
}
