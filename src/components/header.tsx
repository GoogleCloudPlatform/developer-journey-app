import styles from 'src/styles/Home.module.css'
import Link from 'next/link';

// Components
import LoginBtn from "./login-btn";

export default function Home() {
  return (
    <header className={styles.header}>
      <div>
        <LoginBtn />
      </div>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/mission-history">Mission History</Link>
      </div>
    </header>
  )
}
