import styles from 'src/styles/Mission.module.css'
import Tile from "./tile";

export default function Component() {

  return (
    <section className={styles.tileBoard}>
      <Tile x='0' y='2' />
      <Tile x='1' y='2' />
      <Tile x='2' y='2' />
      <Tile x='0' y='1' />
      <Tile x='1' y='1' />
      <Tile x='2' y='1' />
      <Tile x='0' y='0' />
      <Tile x='1' y='0' />
      <Tile x='2' y='0' />
    </section>
  )
}
