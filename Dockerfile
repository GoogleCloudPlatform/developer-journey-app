# syntax = docker/dockerfile:1.2

#######################################
FROM node:18-slim AS base
#######################################


#######################################
FROM base AS deps
#######################################
WORKDIR /app
COPY package.json \
     package-lock.json* \
     yarn.lock* \
     pnpm-lock.yaml* \
     ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then npm add --global pnpm && pnpm i --frozen-lockfile; \
  else echo "Package is missing a lockfile." && exit 1; \
  fi


#######################################
FROM base AS builder
#######################################
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry before building: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build


#######################################
FROM base AS runner
#######################################
WORKDIR /app

RUN adduser --system --uid 1001 nextjs
RUN addgroup --system --gid 1001 nodejs

# Only necessary files to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# [next.config.js] nextConfig must have `property: output: "standalone"`
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
# Disable telemetry before running: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080
CMD ["node", "server.js"]
