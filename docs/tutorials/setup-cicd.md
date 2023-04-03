# Push application code to your project's Cloud Source repository

The application code was cloned from the public GitHub repository. The following
will push the local files to your project's Cloud Source repository and change
the upstream:

```
gcloud init && \
git config --global credential.https://source.developers.google.com.helper gcloud.sh && \
git config --global credential.https://source.developers.google.com.helper gcloud.sh && \
git remote add google https://source.developers.google.com/p/${GOOGLE_CLOUD_PROJECT}/r/dev-journey && \
git push --all google
```
