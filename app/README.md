# Developer notes

These notes are for local development.

This is a [Next.js](https://nextjs.org/) 13 (stable) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone this repo and change directory (`cd`) to it.

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

> If you don't have a preference, [pnpm](https://pnpm.io/) is recommended for local development.
> However, this repo standardizes on `npm`, so `yarn.lock` and `pnpm-lock.yaml` are ignored
> (`.gitignore`).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing pages. The browser auto-updates as changes are saved.

A sample [API route](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Tests

```bash
npm test
npm run test:watch
# or
yarn test
yarn test:watch
# or
pnpm test
pnpm test:watch
```

[ts-jest](https://kulshekhar.github.io/ts-jest/) is installed as a dev
dependency to support writing tests in TypeScript. The jest configuration
(`jest.config.js`) sets `preset: 'ts-jest'` to enable this.

Initial test example is located at `src/lib/__test__/database.test.ts`.
