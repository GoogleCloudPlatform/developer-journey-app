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

Follow the pre-requisites before continuing. If you want to learn more about CI/CD, check out our [documentation](#provision-a-cicd-pipeline).

**Note:** The manual `gcloud` commands below will be automated in future iterations of this project.

### Pre-requisites

Set your environment variables:

```bash
export PROJECT_ID="your-project-id"
export PROJECT_NUM="your-project-num"
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

Create (or use an existing) a Firestore native database. 

```bash
gcloud firestore databases create --location=nam5
```

3. Change directory to the root and push a new container image to [Artifact Registry](Artifact Registry Console).

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

4. Create a service account for Cloud Run service

```bash
gcloud iam service-accounts create cloud-run-service-account \
    --display-name="Service account for dev-journey Cloud Run service"
```

5. Grant roles to your newly created service account.

```bash
# Adding roles/run.invoker to your new service account to access your service
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:cloud-run-service-account@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/run.invoker"

# Adding roles/secretmanager.secretAccessor to access required secrets
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:cloud-run-service-account@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
```

6. Create secret for Cloud Run (Next.js app) container with [Secret Manager](Secret Manager).

```bash
# Creates a new secret with randomly generated number
echo -n $RANDOM | gcloud secrets create $SECRET_NAME \
    --replication-policy="automatic" \
    --data-file=-
```

7. Deploy the image you just created to Cloud Run.

```bash
gcloud run deploy $CLOUD_RUN_SERVICE_NAME \
    --project $PROJECT_ID \
    --region $REGION \
    --image $REGION-docker.pkg.dev/$PROJECT_ID/$AR_REPO_NAME/$IMAGE_NAME \
    --service-account cloud-run-service-account@${PROJECT_ID}.iam.gserviceaccount.com
```

8. Update your newly deployed Cloud Run service with required environment variables and the secret you created.

```bash
export SITE_URL = $(gcloud run services describe $CLOUD_RUN_SERVICE_NAME --project "${PROJECT_ID}" --region "${REGION}" --format "value(status.address.url)")

gcloud run services update $CLOUD_RUN_SERVICE_NAME \
    --update-env-vars "PROJECT_ID=${PROJECT_ID},NEXTAUTH_URL=${SITE_URL}" \
    --update-secrets "NEXTAUTH_SECRET=projects/${PROJECT_NUM}/secrets/${SECRET_NAME}:latest" \
    --region $REGION \
    --project $PROJECT_ID \
    --service-account cloud-run-service-account@${PROJECT_ID}.iam.gserviceaccount.com
```

9. Now, let's verify your setup.

* Open your newly deployed [Cloud Run] service.
* Log into the game and successfully complete a mission by landing on the Google Cloud icon.
* Open your [Firestore console] database.
* Verify the `users` collection exists, your given `username`, and past sessions are displayed.

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
    --project=$PROJECT_ID 

# Rollback to a specific revision
gcloud run services update-traffic $CLOUD_RUN_SERVICE_NAME \
    --to-revisions=$REVISION_NAME=100 \
    --platform=managed \
    --region=$REGION \
    --project=$PROJECT_ID 

# Rollback to the latest
gcloud run services update-traffic $CLOUD_RUN_SERVICE_NAME \
    --to-latest \
    --platform=managed \
    --region=$REGION \
    --project=$PROJECT_ID 
```

# Example CICD pipeline

This repository includes an example CI/CD pipeline that uses Cloud Build and Cloud Deploy to continuously intergrate 
changes to the application code into new builds of your application and automatically deploy those builds to to Cloud 
Run.  The following steps are required to set this pipeline up:

1. Deploy application infrastructure to a Google Cloud project
2. Fork this repository 
3. Connect the fork to your Google Cloud project
4. Run the Terraform code in `infra/environments/main`


## 1. Deploy the application infrastructure

Using a Google Cloud Project with billing enabled, deploy the application infrastructure via the Terraform made 
available in the 
[terraform-dynamic-javascript-webapp repo](https://github.com/GoogleCloudPlatform/terraform-dynamic-javascript-webapp/tree/main/infra) 


## 2. Fork this repository

In order to demonstrate the CI/CD pipeline, you'll need to create a fork of this repository so that you can make 
changes to the main branch and initiate the pipeline. Instructions for forking a repository can be found in GitHub's
[documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

## 3. Connect your fork to your Google Cloud Project

Cloud Build triggers can be created to respond to GitHub repository actions, such as pull requests, and merges to the
main branch. To be able to create such triggers, the Google Cloud project must have the repository added to it in the 
region of the trigger.

Connect your GitHub repo to your Google Cloud project via the 
[Cloud Build triggers page](https://console.cloud.google.com/cloud-build/triggers/connect), making sure to specify the 
'global' region.


## 4. Run the Terraform code

The `infra/environments/main` directory is a root Terraform module that creates the CICD pipeline resources in the
specified project. To apply the Terraform to your project, do the following from the `main` directory:

1. Supply the values for the variables

    Rename `terraform.tfvars.example` to terraform.tfvars. This file is where you can provide values for the required
    variables.  

2. Run `terraform init`

   To initiate the root module, run [`terraform init`](https://developer.hashicorp.com/terraform/cli/commands/init). 
   This initializes the working directory containing Terraform configuration files.

3. Run `terraform plan`

   Running [`terraform plan`](https://developer.hashicorp.com/terraform/cli/commands/plan) will output an execution 
   plan that will servce as a preview of any changes that will be made to your Google Cloud project. 

4. Run `terraform apply`
   
   To apply the changes to your Google Cloud project, run 
   [`terraform apply`](https://developer.hashicorp.com/terraform/cli/commands/apply). The output will include the plan
   and a prompt requesting that you approve the plan.  Enter `yes` to deploy the Google Cloud resources to your 
   project.  

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
