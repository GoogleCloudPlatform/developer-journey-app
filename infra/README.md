# Infrastructure

Welcome. This will auto-provision using [Terraform] solely the CI/CD pipeline for `developer-journey-app`.
The following are the main resources that will be set up for you.

* [Cloud Build]
* [Cloud Build Triggers]
* [Cloud Deploy]

## Getting started

These instructions assume that you have an existing operational [Cloud Run Service] and the following resources:

* [Artifact Registry] for managing container images
* [Cloud Run] for scalable serverless apps
* [Cloud Firestore] for scalable serverless databases
* [Secret Manager] for managing project secrets storage

If your project does meet this requirement, continue to the [CI/CD documentation](./environments/dev/README.md) to learn more, 
otherwise follow the pre-requisites before continuing.

**Note:** The manual `gcloud` commands below will be automated in future iterations of this project.

### Pre-requisites

Set your environment variables:

```bash
export PROJECT_ID="your-project"
export REGION="your-region"
export AR_REPO_NAME="dev-journey-repo"
export CLOUD_RUN_SERVICE_NAME="dev-journey"
export IMAGE_NAME="dev-journey"
export SECRET_NAME="dev-journey-nextauth-secret"
```

1. Enable relevant Google Cloud services.

```bash
gcloud services enable artifactregistry.googleapis.com firestore.googleapis.com run.googleapis.com secretmanager.googleapis.com
```

2. Create Cloud Firestore.

If you haven't already, create a Firestore native database.

```bash
gcloud firestore databases create --location=nam5
```

3. Ensure that your project has [Artifact Registry](Artifact Registry Console) enabled. Once you've verified, locate the app's `Dockerfile` at root of the project.
Change directory to the root and push a new container image to [Artifact Registry](Artifact Registry Console).

```bash
# Root project where Dockerfile lives
cd developer-journey-app/

# Create your Artifact Repository repo
gcloud artifacts repositories create $AR_REPO_NAME \
--repository-format=docker \
--location=$REGION --description="Developer Journey App repository"

# Create container image and push to new Artifact Registry repo
gcloud builds submit \
--project $PROJECT_ID \
--tag $REGION-docker.pkg.dev/$PROJECT_ID/$AR_REPO_NAME/$IMAGE_NAME .
```

4. Create secret for Cloud Run (Next.js app) container with [Secret Manager](Secret Manager).

```bash
# Creates a new secret with randomly generated number
echo -n $RANDOM | gcloud secrets create $SECRET_NAME \
    --replication-policy="automatic" \
    --data-file=-
```

5. Deploy your Cloud Run container

```bash
gcloud run deploy $CLOUD_RUN_SERVICE_NAME \
    --project $PROJECT_ID \
    --region $REGION \
    --image $REGION-docker.pkg.dev/$PROJECT_ID/$AR_REPO_NAME/$IMAGE_NAME 
```

6. Update your newly deployed Cloud Run service with required environment variables and secrets.

```bash
export SITE_URL = $(gcloud run services describe $CLOUD_RUN_SERVICE_NAME --project "${PROJECT_ID}" --region "${REGION}" --format "value(status.address.url)")

gcloud run services update $CLOUD_RUN_SERVICE_NAME \
    --update-env-vars "PROJECT_ID=${PROJECT_ID},NEXTAUTH_URL=${SITE_URL}" \
    --update-secrets "CLIENT_ID=projects/${PROJECT_ID}/secrets/${SECRET_NAME}:latest" \
    --region $REGION \
    --project $PROJECT_ID
```

7. Verify that your set up.

* Open your newly deployed [Cloud Run] service.
* Log into the game and play. Make sure your complete the game by landing on the Google Cloud icon!
* Open your [Firestore console] database.
* Verify `users` collection exists, your given `username`, and past sessions are displayed.

## Modifying Schema

The sample app stores `users` and their past `missions` upon session completion.
Note that each completed `mission` ID correlates with `src/initialData.ts/missions.ts`.

# Example

| Collection | Document | Field (`completedMissions`) | Field (`username`) | 
|------|-------------|------|---------|
| `users` | `janedoe` | `abc123` | `janedoe` |

Learn how to seed your [Cloud Firestore], as well as export, data [here](https://cloud.google.com/firestore/docs/manage-data/export-import).

## Manually Rollback

If you've opted to not use [Cloud Deploy], leverage the following to perform rollbacks for your [Cloud Run] service.

```bash
# Lists out revisions for Cloud Run service
gcloud run revisions list \
    --platform=managed \
    --region=$REGION \
    --project $PROJECT_ID

# Rollback to a specific revision
gcloud run services update-traffic $CLOUD_RUN_SERVICE_NAME \
    --to-revisions $REVISION_NAME=100 \
    --platform=managed \
    --region=$REGION \
    --project $PROJECT_ID

# Rollback to the latest
gcloud run services update-traffic $CLOUD_RUN_SERVICE_NAME \
    --to-latest \
    --platform=managed \
    --region=$REGION \
    --project $PROJECT_ID
```

<!-- doc links -->
[Artifact Registry]:
https://cloud.google.com/artifact-registry

[Artifact Registry Console]:
https://console.cloud.google.com/artifacts

[Cloud Firestore]:
https://cloud.google.com/firestore

[Firestore Console]:
https://console.cloud.google.com/firestore

[Cloud Build]:
https://cloud.google.com/build

[Cloud Deploy]:
https://cloud.google.com/deploy

[Cloud Run]:
https://cloud.google.com/run

[Secret Manager]:
https://console.cloud.google.com/security/secret-manager

[Terraform]:
(https://www.terraform.io)
