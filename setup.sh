#!/bin/bash
#
# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

echo "==================================================="
echo "🎮 Greetings! Beginning developer-journey-app setup"
echo "==================================================="

export PROJECT_ID=${PROJECT_ID:=$(gcloud config get project)}
export REGION=${REGION:=us-central1}
export PROJECTNUM=${PROJECT_ID:=$(gcloud projects describe ${PROJECT_ID} --format='value(projectNumber)')}
export REPO_OWNER=${REPO_NAME:=repo-owner}
export REPO_NAME=${REPO_NAME:=repo-name}
export ENV=${ENV:=dev}

echo "==================================================="
echo "🎮 Build app image"
echo "==================================================="

gcloud builds submit --project $PROJECT_ID --tag $REGION-docker.pkg.dev/$PROJECT_ID/dev-journey-repo/dev-journey .

echo "==================================================="
echo "🎮 Deploy initial container"
echo "==================================================="

gcloud run deploy --project $PROJECT_ID --image=$REGION-docker.pkg.dev/$PROJECT_ID/dev-journey-repo/dev-journey

echo "==================================================="
echo "🎮 Add Github repo to GCP project"
echo "==================================================="

export REPO_CONNECT_URL="https://console.cloud.google.com/cloud-build/triggers/connect?project=${PROJECT_ID}"

echo "Connect a fork of the developer-journey-app GitHub repo to your ops project (making sure to specify region Global) via the Cloud Console:${NC} $(tput bold)${REPO_CONNECT_URL}$(tput sgr0) \n"
read -n 1 -r -s -p $'Once your forked developer-journey-app repo is connected, please type any key to continue.\n'

continue=1
while [[ ${continue} -gt 0 ]]; do
    read -rp "Please input the GitHub repository owner: " REPO_OWNER
    read -rp "Please input the GitHub repository name: " REPO_NAME
    echo -e "\n"
    read -rp "Is this the correct repository URL? $(tput bold)https://github.com/${REPO_OWNER}/${REPO_NAME}$(tput sgr0)? (Y/n) " yesno
    case "$yesno" in
    [yY][eE][sS]|[yY]|"")
        continue=0
        ;;
    *)
        continue=1
        ;;
    esac
done

echo "==================================================="
echo "🎮 Executing Terraform"
echo "==================================================="

export TFSTATE_BUCKET=terraform-${PROJECT_ID}

gsutil mb gs://$TFSTATE_BUCKET || true 

export BUILD_SA="$(gcloud projects describe $PROJECT_ID --format 'value(projectNumber)')@cloudbuild.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID --member serviceAccount:$BUILD_SA --role roles/owner
gsutil iam ch serviceAccount:${BUILD_SA}:roles/storage.admin gs://$TFSTATE_BUCKET

gcloud builds submit --project="$PROJECT_ID" --config ./infra/terraform-${ENV}.cloudbuild.yaml

echo "==================================================="
echo "🎮 Deployment completed!"
echo "==================================================="

export SITE_URL="$(gcloud run services describe dev-journey --project ${PROJECT_ID} --region ${REGION} --format 'value(status.url)')"

echo "🎮 App is now staged in ${ENV} environment at ${SITE_URL}"
