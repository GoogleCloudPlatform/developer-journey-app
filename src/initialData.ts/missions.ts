import { Mission } from "src/models/Mission";

export const missions: Mission[] = [
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