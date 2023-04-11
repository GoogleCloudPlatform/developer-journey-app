# syntax = docker/dockerfile:1.2

#######################################
FROM node:18-slim AS builder
#######################################

WORKDIR /app
COPY package.json \
     package-lock.json* \
     ./
     
RUN npm ci
COPY . .

# Disable telemetry before building: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

#######################################
FROM node:18-slim AS runner
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
ENV NODE_ENV production

CMD ["node", "server.js"]