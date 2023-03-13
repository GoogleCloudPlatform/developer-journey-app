import { useState } from "react"

const missions = [
  {
    "id": "AsEOyVuuSPdAAf1ZKhSU",
    "title": "Deploy a NextJS App with a Firestore Database",
    "technologies": ['CLOUD_RUN', 'FIRESTORE'],
    "learningResources": [
      {
        "title": "Integrate Next.js",
        "link": 'https://firebase.google.com/docs/hosting/nextjs'
      },
    ],
  },
  {
    "id": "Sb8XWrxLMykaBU7oZEMH",
    "title": "Deploy a NodeJS App with a Firestore Database",
    "technologies": ['CLOUD_RUN', 'FIRESTORE', 'CLOUD_STORAGE', 'OPERATIONS_SUITE'],
    "learningResources": [
      {
        "title": "Getting started with Node.js",
        "link": 'https://cloud.google.com/nodejs/getting-started'
      },
    ],
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
        {currentMission.technologies.join(', ')}
      </div>
    </>
  )
}




