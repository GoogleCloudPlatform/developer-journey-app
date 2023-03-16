import styles from 'src/styles/Mission.module.css'

// Redux
import { RootState } from '../redux/store'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { moveUp, moveDown, moveLeft, moveRight } from '../redux/playerPositionSlice'
import { useEffect } from 'react';

export default function Component() {
  const playerPosition = useAppSelector((state: RootState) => state.playerPosition)
  const dispatch = useAppDispatch()

  function keyPressHandler({ key, keyCode }: any) {
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
      case 38:
        return dispatch(moveUp())
      case 37:
        return dispatch(moveLeft())
      case 40:
        return dispatch(moveDown())
      case 39:
        return dispatch(moveRight())
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

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




