import Image from 'next/image'
import { RootState } from '../redux/store'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { GridPosition } from 'src/models/GridPosition';
import { collectItem, moveDown, moveLeft, moveRight, moveUp, setIsSavingMission, startMission } from 'src/redux/gameSlice';
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
      <section className="min-h-full" onClick={() => {
        const playerIsLeftOfTile = playerPosition.x + 1 === x && playerPosition.y === y;
        if (playerIsLeftOfTile) {
          dispatch(moveRight())
        }
        const playerIsRightOfTile = playerPosition.x - 1 === x && playerPosition.y === y;
        if (playerIsRightOfTile) {
          dispatch(moveLeft())
        }
        const playerIsAboveTile = playerPosition.x === x && playerPosition.y - 1 === y;
        if (playerIsAboveTile) {
          dispatch(moveDown())
        }
        const playerIsBelowTile = playerPosition.x === x && playerPosition.y + 1 === y;
        if (playerIsBelowTile) {
          dispatch(moveUp())
        }
      }}>
        <figure className="bg-slate-200 rounded-xl p-3 w-full">
          <div className="h-8 md:h-12 lg:h-20 flex justify-between">
            {playerIsOnTile && session?.user?.image ? (
              <img
                className="rounded-full"
                src={session.user.image}
                alt=""
                referrerPolicy="no-referrer"
              />
            ) : <div />}
            {tileItem && (
              <Image
                src={`./google-cloud-icons/${tileItem.title}.svg`}
                alt={`icon of ${tileItem.title}`}
                width='80'
                height='80'
                className='align-right text-right'
              />
            )}
            {allItemsCollected && tileIsFinalTile && (
              <Image
                src='/Google_Cloud_logo.svg'
                alt='Google Cloud Logo'
                width='80'
                height='80'
                className='align-right text-right h-auto w-auto'
              />
            )}
          </div>
          <div className="h-10 text-center">
            {playerIsOnTile && tileItem && (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                onClick={() => dispatch(collectItem())}
              >
                Collect
              </button>
            )}
            {allItemsCollected && tileIsFinalTile && playerIsOnTile && (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded disabled:bg-slate-50 disabled:text-slate-500'
                disabled={!playerIsOnTile || isSavingMission} onClick={completeMission}
              >
                {isSavingMission ? 'Saving...' : 'Complete'}
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
