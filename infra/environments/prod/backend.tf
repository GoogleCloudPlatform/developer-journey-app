terraform {
  backend "gcs" {
    bucket                      = "birds-of-paradise-tf-state"
    prefix                      = "build-cicd-state"
    impersonate_service_account = "terraformer@birds-of-paradise.iam.gserviceaccount.com"
  }
}