import styles from 'src/styles/Home.module.css'
import Link from 'next/link';

// Components
import LoginBtn from "./login-btn";

export default function Home() {
  return (
    <header className={styles.header}>
      Developer App Journey
      <div>
        <LoginBtn />
      </div>
      <div>
        <Link href="/secure-page-example">Secure page example</Link>
      </div>
    </header>
  )
}
