# Development environment instructions

1. Deploy the application infrastructure via the Terraform in the [terraform-dynamic-javascript-webapp repo](https://github.com/GoogleCloudPlatform/terraform-dynamic-javascript-webapp/tree/main/infra). 
1. Fork this repo (GoogleCloudPlatform/developer-journey-app) to your GitHub account.
1. Connect your GitHub repo to your Google Cloud project via 
1. From the `infra/environments/dev` directory, run:
    `terraform init`
    `terraform plan`
    `terraform apply`
1. Provide values for the prompted variables:

    - `project_id` - The Google Cloud Project to deploy resources to.
    - `run_service_name` - The name of the deployed run service.
    - `run_service_account` - The email of the Cloud Run service account.
    - `github_repository_url` - The URL of the connected GitHub repository (example: http://github.com/your-account/forked-repo-name)