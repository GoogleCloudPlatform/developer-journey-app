variable "project_id" {
  type        = string
  description = "Google Cloud project ID to deploy resources to."
}

variable "run_service_name" {
  type        = string
  description = "The name of the Cloud Run service that this pipeline will deploy to."
  default     = "dev-journey"
}