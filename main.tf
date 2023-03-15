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

# GCS bucket
resource "random_id" "bucket_prefix" {
  byte_length = 6
}

resource "google_storage_bucket" "default" {
  name          = "image-backend-bucket-${random_id.bucket_prefix.hex}"
  project       = var.project_id
  location      = "us-central1"
  storage_class = "REGIONAL"
  force_destroy = true
}

resource "google_storage_bucket_iam_member" "default" {
  bucket = google_storage_bucket.default.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

resource "google_compute_backend_bucket" "default" {
  name        = "serverless-app-backend-bucket"
  description = "Serverless app backend bucket"
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

# Cloud Run service and network endpoint group
resource "google_cloud_run_v2_service" "default" {
  name     = "hello"
  project  = var.project_id
  location = "us-central1"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    }
  }
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
  location = google_cloud_run_v2_service.default.location
  project  = google_cloud_run_v2_service.default.project
  service  = google_cloud_run_v2_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_compute_region_network_endpoint_group" "default" {
  name                  = "run-network-endpoint-group"
  network_endpoint_type = "SERVERLESS"
  region                = "us-central1"
  cloud_run {
    service = google_cloud_run_v2_service.default.name
  }
}
# TODO: Make into HTTPS
# External HTTP loadbalancer
resource "google_compute_global_address" "default" {
  name    = "reserved-ip"
  project = var.project_id
}

resource "google_compute_backend_service" "default" {
  name       = "run-backend-service"
  port_name  = "http"
  protocol   = "HTTP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  enable_cdn = true
  backend {
    group = google_compute_region_network_endpoint_group.default.id
  }
  log_config {
    enable = true
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

resource "google_compute_url_map" "default" {
  name            = "http-lb"
  default_service = google_compute_backend_service.default.id
  host_rule {
    hosts        = ["${google_compute_global_address.default.address}"]
    path_matcher = "ip4addr"
  }
  path_matcher {
    name            = "ip4addr"
    default_service = google_compute_backend_service.default.id
    path_rule {
      paths   = ["/img/*"]
      service = google_compute_backend_bucket.default.id
    }
  }
}

resource "google_compute_target_http_proxy" "default" {
  name    = "http-proxy"
  url_map = google_compute_url_map.default.id
}

resource "google_compute_target_https_proxy" "default" {
  name    = "https-proxy"
  url_map = google_compute_url_map.default.id

  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
  # certificate_map  = 
  # ssl_policy       = 
  # quic_override    = 
}

resource "google_compute_managed_ssl_certificate" "default" {
  name = "test-ssl-certificate"

  managed {
    domains = ["example.com."]
  }
}

resource "google_compute_global_forwarding_rule" "http" {
  name                  = "http-forwarding-rule"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80"
  target                = google_compute_target_http_proxy.default.id
  ip_address            = google_compute_global_address.default.id
}

resource "google_compute_global_forwarding_rule" "https" {
  name                  = "https-forwarding-rule"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "443"
  target                = google_compute_target_https_proxy.default.id
  ip_address            = google_compute_global_address.default.id
}

# Firestore
# resource "google_firestore_database" "database" {
#   name                        = "(default)"
#   location_id                 = "nam5"
#   type                        = "FIRESTORE_NATIVE"
#   concurrency_mode            = "OPTIMISTIC"
#   app_engine_integration_mode = "DISABLED"
# }