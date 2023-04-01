variable "project_id" {
  type        = string
  description = "Google Cloud project ID to deploy resources to."
}

variable "run_service_name" {
  type        = string
  description = "The name of the Cloud Run service that this pipeline will deploy to."
  default     = "dev-journey"
}

variable "run_service_account" {
  type        = string
  description = "The email of the Cloud Run service account for the service."
}

variable "github_repository_url" {
  type        = string
  description = "URL of connected GitHub repository (https://github.com/repo_owner/repo_name)"
}