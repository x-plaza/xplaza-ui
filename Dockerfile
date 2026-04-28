# syntax=docker/dockerfile:1.7

# ---- Stage 1: Install dependencies ----
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10 --activate
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/storefront/package.json ./apps/storefront/
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/api-client/package.json ./packages/api-client/
COPY packages/auth/package.json ./packages/auth/
COPY packages/i18n/package.json ./packages/i18n/
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---- Stage 2: Build ----
FROM node:22-alpine AS build
RUN corepack enable && corepack prepare pnpm@10 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/storefront/node_modules ./apps/storefront/node_modules
COPY --from=deps /app/packages/types/node_modules ./packages/types/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY --from=deps /app/packages/utils/node_modules ./packages/utils/node_modules
COPY --from=deps /app/packages/api-client/node_modules ./packages/api-client/node_modules
COPY --from=deps /app/packages/auth/node_modules ./packages/auth/node_modules
COPY --from=deps /app/packages/i18n/node_modules ./packages/i18n/node_modules
COPY . .
RUN pnpm --filter storefront build

# ---- Stage 3: Runtime ----
FROM node:22-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/x-plaza/xplaza-ui"
LABEL org.opencontainers.image.description="X-Plaza e-commerce storefront"
LABEL org.opencontainers.image.licenses="Proprietary"

RUN addgroup --system --gid 10001 xplaza \
    && adduser --system --uid 10001 --ingroup xplaza --no-create-home xplaza

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Next.js standalone output
COPY --from=build --chown=xplaza:xplaza /app/apps/storefront/.next/standalone ./
COPY --from=build --chown=xplaza:xplaza /app/apps/storefront/.next/static ./apps/storefront/.next/static
COPY --from=build --chown=xplaza:xplaza /app/apps/storefront/public ./apps/storefront/public

USER xplaza:xplaza

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "apps/storefront/server.js"]
