import { Mission } from "src/models/Mission";

export const missions: Mission[] = [
  {
    id: "Sb8XWrxLMykaBU7oZEMH",
    title: "Deploy a NodeJS App with a Firestore Database",
    technologies: ['cloud_run', 'firestore', 'cloud_storage'],
    learningResources: [
      {
        title: "Getting started with Node.js",
        link: 'https://cloud.google.com/nodejs/getting-started'
      },
    ],
  },
  {
    id: "1rSUn3CLB3UVgPbkoIoh",
    title: "Connect a Go application on Cloud Run to a Cloud SQL for PostgreSQL database",
    technologies: ['cloud_run', 'cloud_sql'],
    learningResources: [
      {
        title: "How to connect a Go application on Cloud Run to a Cloud SQL for PostgreSQL database",
        link: 'https://codelabs.developers.google.com/codelabs/cloud-sql-go-connector'
      },
    ],
  },
  {
    id: "Tc9YXsyMNzlbCV8pAFNI",
    title: "Deploy a NodeJS App to Google Kubernetes Engine",
    technologies: ['google_kubernetes_engine', 'cloud_build', 'artifact_registry'],
    learningResources: [
      {
        title: "Deploy an app in a container image to a GKE cluster",
        link: 'https://cloud.google.com/kubernetes-engine/docs/quickstarts/deploy-app-container-image#node.js'
      },
    ],
  },
  {
    id: "3ukaXbkeaBG2CXRMgIjl",
    title: "Allow third-party services to access specific backend resources in a Shared VPC network",
    technologies: ['cloud_load_balancing', 'cloud_run', 'cloud_firewall_rules', 'virtual_private_cloud', 'compute_engine'],
    learningResources: [
      {
        title: "Allow third-party services to access specific backend resources in a Shared VPC network",
        link: 'https://cloud.google.com/community/tutorials/serverless-backend-access-in-shared-vpc'
      },
    ],
  },
];