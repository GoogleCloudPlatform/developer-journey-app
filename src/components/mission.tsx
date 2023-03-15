import Image from 'next/image'
import { Mission } from "src/models/Mission";
import styles from 'src/styles/Mission.module.css'

import GameControls from "../components/game-controls";

export default function Component() {
  const missions: Mission[] = [
    {
      "id": "AsEOyVuuSPdAAf1ZKhSU",
      "title": "Deploy a NextJS App with a Firestore Database",
      "technologies": ['cloud_run', 'firestore'],
      "learningResources": [
        {
          "title": "Integrate Next.js",
          "link": 'https://firebase.google.com/docs/hosting/nextjs'
        },
      ],
      status: 'NOT_STARTED',
    },
    {
      "id": "Sb8XWrxLMykaBU7oZEMH",
      "title": "Deploy a NodeJS App with a Firestore Database",
      "technologies": ['cloud_run', 'firestore', 'cloud_storage'],
      "learningResources": [
        {
          "title": "Getting started with Node.js",
          "link": 'https://cloud.google.com/nodejs/getting-started'
        },
      ],
      status: 'NOT_STARTED',
    },
  ];
  const currentMission = missions[0];

  return (
    <>
      <section className={styles.prompts}>
        <ul>
          <li>
            Welcome to
            {': '}
            {currentMission.title}
          </li>
          <li>
            Status:
            {' '}
            {currentMission.status}
          </li>
        </ul>
        To learn more, check out these learning resources:
        <ul>
          {currentMission.learningResources.map(learningResource => (
            <li key={learningResource.link}>
              <a href={learningResource.link}>
                {learningResource.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.content}>
        <h2>Tiles</h2>
      </section>
      <GameControls />
      <section className={styles.inventory}>
        <h2>Inventory</h2>
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
      <footer className={styles.footer}>
        Mission Selector:
      </footer>
    </>
  )
}




