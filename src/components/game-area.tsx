import Head from 'next/head'
import styles from 'src/styles/Home.module.css'
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { moveUp, moveDown, moveLeft, moveRight } from '../redux/playerPositionSlice'

// Redux
import { RootState } from '../redux/store'

// Components
import Mission from "../components/mission";
import LoginBtn from "../components/login-btn";

export default function Home() {
  const count = useAppSelector((state: RootState) => state.playerPosition)
  const dispatch = useAppDispatch()

  return (
    <>
      <Head>
        <title>Birds of Paradise</title>
        <meta name="description" content="Google Cloud head start app for JavaScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper}>
        <header className={styles.header}>
          Google Cloud head start app for JavaScript - Developer App Journey
        </header>
        <Mission />
        <div>
          <LoginBtn />
        </div>
        <div>
          <Link href="/secure-page-example">Secure page example</Link>
        </div>
      </main>

      <div>
        <div>
          <span>{JSON.stringify(count)}</span>
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
        </div>
      </div>
    </>
  )
}
