# X-Plaza UI

[![CI](https://github.com/x-plaza/xplaza-ui/actions/workflows/main.yml/badge.svg)](https://github.com/x-plaza/xplaza-ui/actions/workflows/main.yml)

Multi-vendor marketplace frontend. Next.js 15, React 19, TypeScript, Tailwind CSS 4, Turborepo + pnpm monorepo.

## Quick Start

```bash
git clone https://github.com/x-plaza/xplaza-ui.git && cd xplaza-ui
corepack enable
pnpm install
pnpm dev
```

Storefront → http://localhost:3000
Vendor → http://localhost:3001
Admin → http://localhost:3002

Run a single app: `pnpm dev --filter=@xplaza/storefront`

## Project Structure

```
xplaza-ui/
├── apps/
│   ├── storefront/     # Customer marketplace        :3000
│   ├── vendor/         # Seller dashboard             :3001
│   └── admin/          # Platform admin               :3002
├── packages/
│   ├── ui/             # Shared components (Radix + Tailwind)
│   ├── types/          # Shared TypeScript types
│   ├── api-client/     # Typed backend API client
│   ├── utils/          # Helpers (cn, formatCurrency, etc.)
│   ├── auth/           # Auth hooks & providers
│   └── i18n/           # next-intl config
└── turbo.json
```

## Commands

```bash
pnpm dev             # Dev all apps (Turbopack)
pnpm build           # Production build
pnpm lint            # ESLint
pnpm typecheck       # TypeScript check
pnpm test            # Vitest
pnpm format          # Prettier
docker build -t xplaza-ui .  # Build Docker image
```

## Environment Variables

| Variable | Default |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` |

## CI/CD

Push to `main` → lint → typecheck → build → Docker push to GHCR → GitHub Release → Coolify deploy.
PRs get lint + typecheck + format check + Trivy + tests + build. Weekly CodeQL scan.

## Related

- [xplaza-backend](https://github.com/x-plaza/xplaza-backend) — Backend (Spring Boot)
