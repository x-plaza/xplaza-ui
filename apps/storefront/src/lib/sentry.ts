/**
 * Sentry error tracking configuration.
 *
 * To enable:
 * 1. Install: pnpm --filter @xplaza/storefront add @sentry/nextjs
 * 2. Set NEXT_PUBLIC_SENTRY_DSN in .env.local
 * 3. Uncomment and configure below
 */

// import * as Sentry from '@sentry/nextjs';
//
// Sentry.init({
//   dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
//   tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
//   environment: process.env.NODE_ENV,
//   enabled: process.env.NODE_ENV === 'production',
// });

export function captureError(error: unknown, context?: Record<string, unknown>) {
  // Sentry.captureException(error, { extra: context });
  if (process.env.NODE_ENV !== 'production') {
    console.error('[Error]', error, context);
  }
}

export function setUser(_user: { id: string; email?: string } | null) {
  // Sentry.setUser(user);
}
