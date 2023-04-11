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

locals {
  repository_name       = split("/", replace(var.github_repository_url, "/(.*github.com/)/", ""))[1]
  repository_owner      = split("/", replace(var.github_repository_url, "/(.*github.com/)/", ""))[0]
  github_repository_url = replace(var.github_repository_url, "/(.*github.com)/", "https://github.com")
  run_service_account   = data.google_cloud_run_service.default.template[0].spec[0].service_account_name
}

data "google_cloud_run_service" "default" {
  name     = var.run_service_name
  project  = var.project_id
  location = var.region
}

### Artifact Registry ###
resource "google_artifact_registry_repository" "default" {
  project       = var.project_id
  location      = var.region
  repository_id = "${var.deployment_name}-repo"
  description   = "Dev journey artifact registry repo."
  format        = "DOCKER"
  labels        = var.labels
  depends_on = [
    time_sleep.project_services
  ]
}

# Cloud Build Trigger

resource "google_service_account" "default" {
  project      = var.project_id
  account_id   = "${var.run_service_name}-builder"
  display_name = "Service Account for Cloud Build deployment to Cloud Run."
}

resource "google_project_iam_member" "builder_logwriter" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.default.email}"
}

resource "google_project_iam_member" "builder_sa_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.default.email}"
}

resource "google_project_iam_member" "builder_run_developer" {
  project = var.project_id
  role    = "roles/run.developer"
  member  = "serviceAccount:${google_service_account.default.email}"
}

resource "google_cloudbuild_trigger" "app_new_build" {
  project     = var.project_id
  name        = "${var.deployment_name}-app-build"
  filename    = "build/app-build.cloudbuild.yaml"
  description = "Initiates new build of ${var.deployment_name}. Triggers by changes to app on main branch of source repo."
  included_files = [
    "src/*",
  ]
  github {
    name  = local.repository_name
    owner = local.repository_owner
    push {
      branch       = "main"
      invert_regex = false
    }
  }
  substitutions = {
    _AR_REPO = "${google_artifact_registry_repository.default.location}-docker.pkg.dev/${google_artifact_registry_repository.default.project}/${google_artifact_registry_repository.default.name}/app"
  }
}

resource "google_pubsub_topic" "gcr" {
  project = var.project_id
  name    = "gcr"
}
resource "google_cloudbuild_trigger" "app_deploy" {
  project         = var.project_id
  name            = "${var.deployment_name}-app-deploy"
  description     = "Triggers on any new website build to Artifact Registry."
  service_account = google_service_account.default.name
  # include_build_logs = "INCLUDE_BUILD_LOGS_WITH_STATUS"
  pubsub_config {
    topic = google_pubsub_topic.gcr.id
  }
  approval_config {
    approval_required = true
  }
  substitutions = {
    _SERVICE             = var.run_service_name
    _IMAGE_NAME          = "$(body.message.data.tag)"
    _REGION              = var.region
    _RUN_SERVICE_ACCOUNT = local.run_service_account
  }
  source_to_build {
    uri       = local.github_repository_url
    ref       = "refs/heads/main"
    repo_type = "GITHUB"
  }
  git_file_source {
    path      = "build/app-deploy.cloudbuild.yaml"
    repo_type = "GITHUB"
    revision  = "refs/heads/main"
    uri       = local.github_repository_url
  }
}

