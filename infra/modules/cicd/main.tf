locals {
  repository_name  = var.repository_name
  repository_owner = var.repository_owner
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

resource "google_cloudbuild_trigger" "app_new_build" {
  project     = var.project_id
  name        = "${var.deployment_name}-new-build"
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
  project     = var.project_id
  name        = "${var.deployment_name}-app-deploy"
  description = "Triggers on any new website build to Artifact Registry."
  pubsub_config {
    topic = google_pubsub_topic.gcr.id
  }
  approval_config {
    approval_required = true
  }
  filename = "build/app-deploy.cloudbuild.yaml"
  substitutions = {
    _SERVICE    = var.run_service_name
    _IMAGE_NAME = "$(body.message.data.tag)"
    _REGION     = var.region
  }
  source_to_build {
    uri       = "https://github.com/${local.repository_owner}/${local.reposiory_name}"
    ref       = "refs/heads/main"
    repo_type = "GITHUB"
  }
}