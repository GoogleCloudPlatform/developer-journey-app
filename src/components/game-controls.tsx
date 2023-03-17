import styles from 'src/styles/Mission.module.css'

// Redux
import { RootState } from '../redux/store'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { moveUp, moveDown, moveLeft, moveRight, collectItem } from '../redux/gameSlice'
import { useEffect } from 'react';

export default function Component() {
  const { playerPosition } = useAppSelector((state: RootState) => state.game)
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




