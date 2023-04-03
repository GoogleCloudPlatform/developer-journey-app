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

