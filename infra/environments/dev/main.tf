module "cloud_build_cicd" {
  source                = "../../modules/cicd"
  project_id            = var.project_id
  run_service_name      = var.run_service_name
  github_repository_url = var.github_repository_url
}
