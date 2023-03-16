import styles from 'src/styles/Mission.module.css'
import { RootState } from '../redux/store'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { GridPosition } from 'src/models/GridPosition';
import { nextMission } from 'src/redux/missionSlice';
import { setPlayerPosition } from 'src/redux/playerPositionSlice';
import { setUser } from 'src/redux/userSlice';
import { User } from 'src/models/User';

// Make the `request` function generic
// to specify the return data type:
function request<TResponse>(
  url: string,
  // `RequestInit` is a type for configuring 
  // a `fetch` request. By default, an empty object.
  config: RequestInit = {}

  // This function is async, it will return a Promise:
): Promise<User> {

  // Inside, we call the `fetch` function with 
  // a URL and config given:
  return fetch(url, config)
    // When got a response call a `json` method on it
    .then((response) => response.json())
    // and return the result data.
    .then((data) => data as User);

  // We also can use some post-response
  // data-transformations in the last `then` clause.
}

export default function Component({ x, y }: GridPosition) {
  const dispatch = useAppDispatch()

  const mission = useAppSelector((state: RootState) => state.mission)
  const playerPosition = useAppSelector((state: RootState) => state.playerPosition)
  const playerIsOnTile = playerPosition.x === x && playerPosition.y === y;
  const tileIsFinalTile = x == 2 && y == 2;

  const completeMission = () => {
    dispatch(nextMission())
    dispatch(setPlayerPosition({ x: 0, y: 0 }))
    request('/api/user', { 
      method: 'POST',
      body: JSON.stringify(mission),
    }).then((response) => {
      dispatch(setUser(response))
    }).catch(error => {
      console.log('/user did not work.', { error })
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
