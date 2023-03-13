import { useState } from "react"
import Image from 'next/image'
import { Mission } from "src/models/Mission";


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

export default function Component() {
  const [currentMission, setCurrentMission] = useState(missions[0]);

  return (
    <>
      {missions.map(mission => (
        <div key={mission.id}>
          <button onClick={() => setCurrentMission(mission)}>
            {mission.title}
          </button>
        </div>
      ))}
      <h2>{currentMission.title}</h2>

      <div>
        The technolgies involved are:
        {currentMission.technologies.join(', ')}
      </div>

      <div>
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
        {currentMission.technologies.map(technology => (
          <Image
            key={technology}
            src={`./google-cloud-icons/${technology}.svg`}
            alt={`icon of ${technology}`}
            width='50'
            height='50'
          />
        ))}
        {currentMission.status}
        <button>
          Complete
          {' '}
          {currentMission.title}
        </button>
      </div>
    </>
  )
}




