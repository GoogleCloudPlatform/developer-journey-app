import Image from 'next/image'
import { Mission } from "src/models/Mission";
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import styles from 'src/styles/Mission.module.css'

export default function Component() {
  const { inventory } = useAppSelector((state: RootState) => state.game)

  return (
    <section className={styles.inventory}>
      <h2>Inventory</h2>
      <div>
        {inventory.filter(item => item.status === 'COLLECTED').map(({title}) => (
          <Image
            key={title}
            src={`./google-cloud-icons/${title}.svg`}
            alt={`icon of ${title}`}
            width='50'
            height='50'
          />
        ))}
      </div>
    </section>
  )
}




