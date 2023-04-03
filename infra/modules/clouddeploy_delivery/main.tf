data "google_cloud_run_service" "default" {
  name     = var.run_service_name
  project  = var.project_id
  location = var.region
}

data "google_service_account" "cloud_run" {
  account_id = "${data.google_cloud_run_service.default.template[0].spec[0].service_account_name}"
}

resource "google_clouddeploy_delivery_pipeline" "default" {
  project  = var.project_id
  location = var.region
  name     = "${var.deployment_name}-delivery"
  description = "Basic delivery pipeline for ${var.deployment_name} app."
  labels = var.labels
  serial_pipeline {
    stages {
      profiles  = ["stage"]
      target_id = "${var.run_service_name}-stage"
    }
    stages {
      profiles  = ["prod"]
      target_id = var.run_service_name
    }
  }
}

resource "google_service_account" "default" {
  project      = var.project_id
  account_id   = "${var.run_service_name}-cloud-deploy"
  display_name = "Service Account for Cloud Deploy deployment to Cloud Run."
}

resource "google_project_iam_member" "deploy_job_runner" {
  project = var.project_id
  role    = "roles/clouddeploy.jobRunner"
  member  = "serviceAccount:${google_service_account.default.email}"
}

resource "google_project_iam_member" "deploy_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.default.email}"
}


resource "google_service_account_iam_binding" "deploy_sa_user_run" {
  service_account_id = data.google_service_account.cloud_run.id
  role               = "roles/iam.serviceAccountUser"

  members = [
    "serviceAccount:${google_service_account.default.email}",
  ]
}

resource "google_clouddeploy_target" "stage" {
  project = var.project_id
  provider = google-beta
  location = var.region
  name     = "${var.deployment_name}-stage-target"
  description = "Stage target for ${var.deployment_name} app."

  execution_configs {
    usages            = ["RENDER", "DEPLOY", "VERIFY"]
    service_account = google_service_account.default.email
  }

  labels = var.labels
  require_approval = false

  run {
    location = "projects/${var.project_id}/locations/${data.google_cloud_run_service.default.location}"
  }
 
}
