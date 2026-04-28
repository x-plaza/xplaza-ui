# X-Plaza UI

<p align="center">
  <a href="https://github.com/x-plaza/xplaza-ui/actions/workflows/main.yml"><img src="https://github.com/x-plaza/xplaza-ui/actions/workflows/main.yml/badge.svg?branch=main" alt="Main Pipeline"></a>
  <a href="https://github.com/x-plaza/xplaza-ui/actions/workflows/pr.yml"><img src="https://github.com/x-plaza/xplaza-ui/actions/workflows/pr.yml/badge.svg" alt="PR Pipeline"></a>
  <a href="https://github.com/x-plaza/xplaza-ui/actions/workflows/security.yml"><img src="https://github.com/x-plaza/xplaza-ui/actions/workflows/security.yml/badge.svg" alt="Security Scan"></a>
  <br>
  <img src="https://img.shields.io/badge/Next.js-15.5-000000?logo=nextdotjs&logoColor=white" alt="Next.js 15.5">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/Turborepo-2-0096FF?logo=turborepo&logoColor=white" alt="Turborepo">
  <img src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white" alt="pnpm 10">
  <img src="https://img.shields.io/badge/License-Proprietary-blue" alt="License">
</p>

Frontend monorepo for the **X-Plaza** multi-vendor marketplace platform. Three Next.js applications — a customer-facing storefront, a vendor dashboard, and an admin panel — share a common design system and API client through internal packages.

## Architecture

```
xplaza-ui/
├── apps/
│   ├── storefront/     # Customer-facing marketplace        → localhost:3000
│   ├── vendor/         # Vendor dashboard & management      → localhost:3001
│   └── admin/          # Platform administration panel      → localhost:3002
├── packages/
│   ├── ui/             # Shared component library (Radix + Tailwind)
│   ├── types/          # Shared TypeScript type definitions
│   ├── api-client/     # API client for the backend
│   ├── utils/          # Shared utilities (cn, formatCurrency, etc.)
│   ├── auth/           # Authentication hooks & providers
│   └── i18n/           # Internationalization configuration
└── turbo.json          # Turborepo pipeline configuration
```

### Apps

| App | Description | Port |
|-----|-------------|------|
| **Storefront** | Customer shopping experience — product browsing, search, cart, checkout, account management, wishlist, order tracking | `3000` |
| **Vendor** | Seller dashboard — product management, inventory, orders, delivery, reviews, analytics | `3001` |
| **Admin** | Platform administration — shops, users, categories, CMS, search, analytics | `3002` |

### Packages

| Package | Description |
|---------|-------------|
| `@xplaza/ui` | Shared component library built on Radix UI primitives with Tailwind CSS styling |
| `@xplaza/types` | Shared TypeScript interfaces and type definitions |
| `@xplaza/api-client` | Typed HTTP client wrapping backend API endpoints |
| `@xplaza/utils` | Common utilities — `cn()`, `formatCurrency()`, `formatDate()`, etc. |
| `@xplaza/auth` | Authentication state management, hooks, and providers |
| `@xplaza/i18n` | `next-intl` configuration for multi-language support |

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15.5 (App Router) with Turbopack |
| **UI** | React 19 + Radix UI + Tailwind CSS 4 |
| **Language** | TypeScript 5 |
| **Data Fetching** | TanStack React Query 5 |
| **State** | Zustand (cart, auth) |
| **Forms** | React Hook Form + Zod validation |
| **i18n** | next-intl |
| **Monorepo** | Turborepo 2 + pnpm 10 workspaces |
| **Testing** | Vitest + React Testing Library + Playwright |
| **Linting** | ESLint 9 (flat config) + Prettier |

## Getting Started

### Prerequisites

- **Node.js ≥ 22**
- **pnpm 10** (enabled via [corepack](https://nodejs.org/api/corepack.html))

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/x-plaza/xplaza-ui.git
cd xplaza-ui

# 2. Enable pnpm via corepack
corepack enable

# 3. Install dependencies
pnpm install

# 4. Start all apps in development mode
pnpm dev
```

| App | URL |
|-----|-----|
| Storefront | http://localhost:3000 |
| Vendor | http://localhost:3001 |
| Admin | http://localhost:3002 |

### Run a single app

```bash
pnpm dev --filter=@xplaza/storefront
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode (Turbopack) |
| `pnpm build` | Production build for all apps |
| `pnpm lint` | Lint all packages and apps |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting without writing |
| `pnpm clean` | Remove all build artifacts |

## Deployment

### Docker

The storefront is containerized with a multi-stage Dockerfile using Next.js standalone output:

```bash
docker build -t xplaza-ui .
docker run -p 3000:3000 xplaza-ui
```

The CI pipeline automatically builds and pushes images to **GitHub Container Registry** on every merge to `main`.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8080` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `http://localhost:3000` |

## CI/CD

| Workflow | Trigger | Description |
|----------|---------|-------------|
| [Main Pipeline](.github/workflows/main.yml) | Push to `main` | Lint, typecheck, build, Docker push to GHCR, GitHub Release, Coolify deploy |
| [PR Pipeline](.github/workflows/pr.yml) | Pull requests | Lint, typecheck, format check, Trivy scan, tests, build |
| [Security Scan](.github/workflows/security.yml) | Push/PR to `main` + weekly | CodeQL analysis for JavaScript/TypeScript |

## Related

- [**xplaza-backend**](https://github.com/x-plaza/xplaza-backend) — Spring Boot API powering the platform

## License

Proprietary. All rights reserved.
