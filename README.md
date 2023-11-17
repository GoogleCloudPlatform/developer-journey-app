# Developer Journey Dynamic Web App

**Developer Journey App** gives developers a fun user interface for exploring a
simple maze to find and collect resources that provide technical tips.

The main goal of the app, however, is to showcase how to write [Next.js] apps 
to reap the performance benefits of [Google Cloud] and [Cloud CDN].

## Launch

[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Fgooglecloudplatform%2Fdeveloper-journey-app)


## Features

This is a demo app built with [TypeScript], [Next.js] and [React]. The app
demonstrates [Static Generation] and [Server-side Rendering]
techniques for pre-rendering cacheable pages.

This demo runs on Google Cloud using the following services:

* [Cloud Run] for scalable serverless apps
* [Cloud Firestore] for scalable serverless databases
* [Cloud CDN] for scalable content delivery and caching


## Getting Started

### Prerequisites

You need a Google Cloud account if you want to open the demo in [Cloud Shell]
(a free online development and operations environment with an integrated editor)
and deploy it.

To run Dev Journey locally **using your own machine**, you will need to install
the following:

* [Node.js] (installing the `LTS` version is recommended).
* [Google Cloud CLI](#3-install-the-google-cloud-cli).
* [Firestore Emulator](#4-install-the-firestore-emulator) (optional).


### 1. Sign up for a Google Cloud Account

You can [sign up here](https://accounts.google.com/SignUp).

Once you have an account, you'll have access to the following:

- [Free Trial]
- [Free Tier]

The Free Trial provides $300 of Cloud Billing credits to pay for resources for
90 days while you try out Google Cloud.

The Free Tier provides access to Google Cloud products for free beyond the
length of the Free Trial period as long as you stay below the
[Free Tier limits].

### 2. Enable billing

If you're using the Free Trial, [Google creates a billing account] for you and
credits $300 to your account.

Once your Free Trial ends, you can continue to use the Free Tier, but you'll
still need to enable a [billing account].

### 3. Install the Google Cloud CLI

You can skip this if you choose to open this project in Google Cloud Shell. The
CLI is already installed.

If you want to work locally, you'll need to
[install the `gcloud` tool](https://cloud.google.com/sdk/docs/install).
If you're on macOS you can also install `gcloud`
[via homebrew](https://formulae.brew.sh/cask/google-cloud-sdk).
Once the installation is done, run `gcloud init` to set up your environment.
More information can be found
[in the docs](https://cloud.google.com/sdk/docs/initializing).

In case your `gcloud` cli is outdated, you can update it running:

```
gcloud components update
```

### 4. Install the Firestore Emulator

Installing the [Firestore Emulator] for local development is optional. If you
don't use the emulator, you will need to create a database on [Cloud Firestore]
that you can use for development and testing.

> The Google Cloud Firestore emulator requires a Java 8+ JRE installed and on
your system PATH
>
> If you need to install Java, you can get it from here:
> https://adoptium.net/
>
> - To choose a specific version, to to: https://adoptium.net/temurin/releases/
> - If you're on a Mac with an Apple Silicon M1 or M2 chip, choose the `aarch64` architecture.
> - Choose `JRE` instead of the full `JDK` package unless you plan to do Java
    >   development.

```bash
gcloud components install cloud-firestore-emulator
# or if already installed:
# gcloud components update
```

### 5. Cloud Firestore for development and production

Clone this repo and change directory (`cd`) to it.

Install dependencies:

```bash
npm install
```

> The repo's `package-lock.json` will be ignored by git if you
> commit changes (configured in `.gitignore`).

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing pages. The browser auto-updates when you save changes.


### If you want to run the Firestore Emulator locally

Choose the port you want to use for the [Firestore Emulator], for example `9999`.

> Note: If you choose a port that is not `9999` for this demo, you will need to update the `host` property in `database.ts` to match your selected port.

Export the `FIRESTORE_EMULATOR_HOST` environment variable:

```bash
export FIRESTORE_EMULATOR_HOST="localhost:9999"
```

Start the emulator:

```bash
gcloud emulators firestore start --host-port="$FIRESTORE_EMULATOR_HOST" --project=demo-test
```

> When the exported `FIRESTORE_EMULATOR_HOST` environment variable is set, the
> Firestore client will automatically use it to connect to the emulator.

Press `Ctrl-C` when you want to stop the Firestore emulator.

> For more detail, see the docs for [Emulate Firestore locally](https://cloud.google.com/firestore/docs/emulator).

## Tests

```bash
npm test
npm run test:watch
```

[ts-jest](https://kulshekhar.github.io/ts-jest/) is installed as a dev
dependency to support writing tests in TypeScript. The jest configuration
(`jest.config.js`) sets `preset: 'ts-jest'` to enable this.

Jest will run tests located in `__test__` directories (for example:
`src/lib/__test__/database.test.ts`).

## Deployment

For instructions on how to deploy this application to a Google Cloud Project,
see the
[Cloud Architecture Center](https://cloud.google.com/architecture/application-development/dynamic-app-javascript#deploy-the-solution).

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for more information how to get started.

Please note that this project is released with a Contributor Code of Conduct. By
participating in this project you agree to abide by its terms. See
[Code of Conduct](CODE_OF_CONDUCT.md) for more information.

## License

Apache 2.0 - See [LICENSE](LICENSE) for more information.


<!-- doc links -->

[billing account]:
https://console.cloud.google.com/billing

[Cloud Run]:
https://cloud.google.com/run

[Cloud CDN]:
https://cloud.google.com/cdn

[Cloud Firestore]:
https://cloud.google.com/firestore

[Cloud Shell]:
https://cloud.google.com/shell

[Firestore Emulator]:
https://cloud.google.com/firestore/docs/emulator

[Free Tier]:
https://cloud.google.com/free/docs/free-cloud-features#free-tier

[Free Tier limits]:
https://cloud.google.com/free/docs/free-cloud-features#free-tier-usage-limits

[Free Trial]:
https://cloud.google.com/free/docs/free-cloud-features#free-trial

[Google Cloud]:
https://cloud.google.com

[Google Cloud CLI]:
https://cloud.google.com/sdk/docs/install

[Google creates a billing account]:
https://support.google.com/cloud/answer/7006543

[Next.js]:
https://nextjs.org/

[Node.js]:
https://nodejs.org/

[React]:
https://reactjs.org/

[Static Generation]:
https://nextjs.org/docs/basic-features/pages#static-generation

[Server-Side Rendering]:
https://nextjs.org/docs/basic-features/pages#server-side-rendering

[sign up here]:
https://accounts.google.com/SignUp

[TypeScript]:
https://www.typescriptlang.org

