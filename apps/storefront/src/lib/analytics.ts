/**
 * Analytics integration placeholder.
 *
 * To enable Google Analytics:
 * 1. Set NEXT_PUBLIC_GA_ID in .env.local
 * 2. Add <GoogleAnalytics /> to layout.tsx
 *
 * Or install a provider SDK (Mixpanel, Amplitude, PostHog, etc.)
 */

type EventProps = Record<string, string | number | boolean>;

export function trackEvent(name: string, properties?: EventProps) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as { gtag: (...args: unknown[]) => void }).gtag('event', name, properties);
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as { gtag: (...args: unknown[]) => void }).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
}
