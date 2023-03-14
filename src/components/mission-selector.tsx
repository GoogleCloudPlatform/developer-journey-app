import { useEffect, useState } from "react"
import Image from 'next/image'
import { Mission } from "src/models/Mission";
import { Database } from "../lib/database";
import { FieldValue } from "@google-cloud/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, arrayUnion, connectFirestoreEmulator } from "firebase/firestore";

const app = initializeApp({
  projectId: "birds-of-paradise",
  // keyFilename: '/path/to/keyfile.json',
});


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 9999);

import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "user", "carl");

const completeMission = (currentMissionId: string) => {
  setDoc(docRef, {
    completedMissions: arrayUnion(currentMissionId)
  }, {merge: true});
  console.log({ currentMissionId })
}

export default function Component() {
  const [missions, setMissions] = useState<Mission[]>([
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
  ]);
  const [currentMission, setCurrentMission] = useState(missions[0]);
  const [user, setUser] = useState({});
  useEffect(() => {
    getDoc(docRef).then((response) => {
      if (response.exists()) {
        const newUser = response.data();
        console.log("Document data:", newUser);
        setUser(newUser);
        const missionsWithStatuses = missions.map(mission => ({
          ...mission,
          status: newUser.completedMissions.includes(mission.id) ? 'COMPLETE' : 'NOT_STARTED',
        }))
        setMissions(missionsWithStatuses);
        setCurrentMission(missionsWithStatuses[0]);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }, []);

  return (
    <>
      <pre>
        {JSON.stringify(missions, null, 2)}
      </pre>
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
        <button onClick={() => completeMission(currentMission.id)}>
          Complete
          {' '}
          {currentMission.title}
        </button>
      </div>
    </>
  )
}




