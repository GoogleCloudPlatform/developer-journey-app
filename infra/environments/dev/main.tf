module "cloud_build_cicd" {
  source           = "../../modules/cicd"
  project_id       = var.project_id
  run_service_name = "dev-journey"
}
