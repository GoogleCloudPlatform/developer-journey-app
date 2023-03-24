/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
locals {
  nextauth_url      = "http://${google_compute_global_address.default.address}"
  firestore_enabled = length(data.google_cloud_asset_resources_search_all.firestore_database.results) == 1 ? true : false
}

### GCS bucket ###

resource "random_id" "bucket_prefix" {
  byte_length = 6
}

resource "google_storage_bucket" "default" {
  project       = var.project_id
  name          = "${var.deployment_name}-bucket-${random_id.bucket_prefix.hex}"
  location      = "US"
  storage_class = "STANDARD"
  force_destroy = true
  labels        = var.labels
}

resource "google_storage_bucket_iam_member" "default" {
  bucket = google_storage_bucket.default.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

resource "google_compute_backend_bucket" "default" {
  project     = var.project_id
  name        = "${var.deployment_name}-backend-bucket"
  description = "Backend bucket for ${var.deployment_name}"
  bucket_name = google_storage_bucket.default.name
  enable_cdn  = true
  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    client_ttl        = 3600
    default_ttl       = 3600
    max_ttl           = 86400
    negative_caching  = true
    serve_while_stale = 86400
  }
}

### Secret Manager resources ###

resource "random_id" "nextauth_secret" {
  byte_length = 32
}

resource "google_secret_manager_secret" "nextauth_secret" {
  project   = var.project_id
  secret_id = "${var.deployment_name}-nextauth-secret"
  replication {
    automatic = true
  }
  labels = var.labels
}

resource "google_secret_manager_secret_version" "nextauth_secret" {
  secret      = google_secret_manager_secret.nextauth_secret.id
  secret_data = random_id.nextauth_secret.b64_std
}

resource "google_secret_manager_secret_iam_binding" "nextauth_secret" {
  project   = var.project_id
  secret_id = google_secret_manager_secret.nextauth_secret.secret_id
  role      = "roles/secretmanager.secretAccessor"
  members = [
    "serviceAccount:${google_service_account.cloud_run.email}",
  ]
}

### Cloud Run service resources and network endpoint group ###

resource "google_service_account" "cloud_run" {
  project      = var.project_id
  account_id   = "${var.deployment_name}-run"
  display_name = "Service account for ${var.deployment_name} Cloud Run service."
}

resource "google_project_iam_member" "run_datastore_owner" {
  project = var.project_id
  role    = "roles/datastore.owner"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_cloud_run_v2_service" "default" {
  project  = var.project_id
  name     = var.deployment_name
  location = "us-central1"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = var.initial_run_image
      env {
        name = "NEXTAUTH_SECRET"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.nextauth_secret.secret_id
            version = "latest"
          }
        }
      }
      env {
        name  = "NEXTAUTH_URL"
        value = local.nextauth_url
      }
      startup_probe {
        initial_delay_seconds = 0
        timeout_seconds       = 1
        period_seconds        = 3
        failure_threshold     = 1
        tcp_socket {
          port = 8080
        }
      }
      liveness_probe {
        http_get {
          path = "/"
        }
      }
    }
    service_account = google_service_account.cloud_run.email
  }
  labels = var.labels
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  project  = google_cloud_run_v2_service.default.project
  location = google_cloud_run_v2_service.default.location
  service  = google_cloud_run_v2_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_compute_region_network_endpoint_group" "default" {
  project               = var.project_id
  name                  = "${var.deployment_name}-network-endpoint-group"
  network_endpoint_type = "SERVERLESS"
  region                = "us-central1"
  cloud_run {
    service = google_cloud_run_v2_service.default.name
  }
}

### External loadbalancer ###
resource "google_compute_global_address" "default" {
  project = var.project_id
  name    = "${var.deployment_name}-reserved-ip"
}

resource "google_compute_url_map" "default" {
  project         = var.project_id
  name            = "${var.deployment_name}-http-load-balancer"
  default_service = google_compute_backend_service.default.id
  host_rule {
    hosts        = ["${google_compute_global_address.default.address}"]
    path_matcher = "ip4addr"
  }
  path_matcher {
    name            = "ip4addr"
    default_service = google_compute_backend_service.default.id
    path_rule {
      paths   = ["/assets/*"]
      service = google_compute_backend_bucket.default.id
    }
  }
}

resource "google_compute_backend_service" "default" {
  project               = var.project_id
  name                  = "${var.deployment_name}-run-backend-service"
  port_name             = "http"
  protocol              = "HTTP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  enable_cdn            = true
  backend {
    group = google_compute_region_network_endpoint_group.default.id
  }
  log_config {
    enable      = true
    sample_rate = 1
  }
  cdn_policy {
    cache_mode                   = "CACHE_ALL_STATIC"
    client_ttl                   = "3600"
    default_ttl                  = "3600"
    max_ttl                      = "86400"
    negative_caching             = true
    serve_while_stale            = "86400"
    signed_url_cache_max_age_sec = 0
    cache_key_policy {
      include_host           = true
      include_http_headers   = []
      include_named_cookies  = []
      include_protocol       = true
      include_query_string   = true
      query_string_blacklist = []
      query_string_whitelist = []
    }
  }
}

resource "google_compute_target_http_proxy" "default" {
  project = var.project_id
  name    = "${var.deployment_name}-http-proxy"
  url_map = google_compute_url_map.default.id
}

resource "google_compute_global_forwarding_rule" "http" {
  project               = var.project_id
  name                  = "${var.deployment_name}-http-forwarding-rule"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80"
  target                = google_compute_target_http_proxy.default.id
  ip_address            = google_compute_global_address.default.id
  labels                = var.labels
}

### Firestore ###

# The following checks Asset Inventory for an existing Firestore database
data "google_cloud_asset_resources_search_all" "firestore_database" {
  provider = google-beta
  scope    = "projects/${var.project_id}"
  asset_types = [
    "firestore.googleapis.com/Database"
  ]
}

# If a Firestore database exists on the project, Terraform will skip this resource
resource "google_firestore_database" "database" {
  count                       = local.firestore_enabled ? 0 : 1
  project                     = var.project_id
  name                        = "(default)"
  location_id                 = "nam5"
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"
}

### Artifact Registry ###
resource "google_artifact_registry_repository" "default" {
  project       = var.project_id
  location      = "us-central1"
  repository_id = "${var.deployment_name}-repo"
  description   = "Dev journey artifact registry repo."
  format        = "DOCKER"
  labels        = var.labels
}
