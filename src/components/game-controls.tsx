import styles from 'src/styles/Mission.module.css'

// Redux
import { RootState } from '../redux/store'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { moveUp, moveDown, moveLeft, moveRight, collectItem, startMission } from '../redux/gameSlice'
import { useEffect } from 'react';
import { useGetUserQuery } from 'src/redux/apiSlice';

export default function Component() {
  const { playerPosition, allItemsCollected } = useAppSelector((state: RootState) => state.game)
  const {
    data: user,
  } = useGetUserQuery();
  const playerOnFinalSquare = playerPosition.x === 2 && playerPosition.y === 2;
  const dispatch = useAppDispatch()

  function keyPressHandler({ key, keyCode }: { key: string | undefined, keyCode: number | undefined }) {
    switch (key) {
      case 'w':
        return dispatch(moveUp())
      case 'a':
        return dispatch(moveLeft())
      case 's':
        return dispatch(moveDown())
      case 'd':
        return dispatch(moveRight())
    }

    switch (keyCode) {
      case 38: // up arrow
        return dispatch(moveUp())
      case 37: // left arrow
        return dispatch(moveLeft())
      case 40: // down arrow
        return dispatch(moveDown())
      case 39: // right arrow
        return dispatch(moveRight())
      case 13: // enter
        if (allItemsCollected && playerOnFinalSquare && user) return dispatch(startMission({user, nextMission: true}))
        return dispatch(collectItem())
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  });

  return (
    <section className={styles.controls}>
      <h2>Controls</h2>
      <div>WASD</div>
      <span>{JSON.stringify(playerPosition)}</span>
      <button
        aria-label="Move player up"
        onClick={() => dispatch(moveUp())}
      >
        Move up
      </button>
      <button
        aria-label="Move player down"
        onClick={() => dispatch(moveDown())}
      >
        Move down
      </button>
      <button
        aria-label="Move player left"
        onClick={() => dispatch(moveLeft())}
      >
        Move left
      </button>
      <button
        aria-label="Move player right"
        onClick={() => dispatch(moveRight())}
      >
        Move right
      </button>
    </section>
  )
}




