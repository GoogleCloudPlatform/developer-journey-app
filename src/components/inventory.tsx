import Image from 'next/image'
import { Mission } from "src/models/Mission";
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import styles from 'src/styles/Mission.module.css'

export default function Component() {
  const currentMission = useAppSelector((state: RootState) => state.mission)

  return (
    <section className={styles.inventory}>
      <h2>Inventory</h2>
      {JSON.stringify({currentMission})}
      <div>
        {currentMission.technologies.map(technology => (
          <Image
            key={technology}
            src={`./google-cloud-icons/${technology}.svg`}
            alt={`icon of ${technology}`}
            width='50'
            height='50'
          />
        ))}
      </div>
    </section>
  )
}




