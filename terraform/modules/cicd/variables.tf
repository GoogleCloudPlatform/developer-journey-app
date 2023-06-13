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

variable "project_id" {
  type        = string
  description = "Google Cloud project ID to deploy resources to."
}

variable "region" {
  type        = string
  description = "Default region to use for Google Cloud resources."
  default     = "us-central1"
}

variable "enable_apis" {
  type        = bool
  description = "Whether or not to enable underlying apis in this solution."
  default     = true
}

variable "labels" {
  type        = map(string)
  description = "A set of key/value label pairs to assign to the resources deployed by this solution."
  default     = {}
}

variable "run_service_name" {
  type        = string
  description = "The name of the Cloud Run service that this pipeline will deploy to."
}

variable "github_repository_url" {
  type        = string
  description = "URL of connected GitHub repository (https://github.com/repo_owner/repo_name)"
}