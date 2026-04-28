import type { RequestOptions } from './client';

interface AuthInterceptorConfig {
  refreshEndpoint: string;
  onRefreshFailure?: () => void;
}

/**
 * Auth interceptor that wraps fetch to handle 401 responses
 * with automatic token refresh and request retry.
 *
 * In the BFF pattern, the refresh is done via a Next.js API route
 * that manages httpOnly cookies transparently.
 */
export function createAuthInterceptor(config: AuthInterceptorConfig) {
  let refreshPromise: Promise<boolean> | null = null;

  async function refreshToken(): Promise<boolean> {
    try {
      const res = await fetch(config.refreshEndpoint, {
        method: 'POST',
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async function refreshWithMutex(): Promise<boolean> {
    if (refreshPromise) {
      return refreshPromise;
    }
    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null;
    });
    return refreshPromise;
  }

  return {
    /**
     * Wraps a fetch call with 401 retry logic.
     * On 401, attempts to refresh the token and retries the original request once.
     */
    async fetchWithRetry(
      url: string,
      init?: RequestInit
    ): Promise<Response> {
      const response = await fetch(url, {
        ...init,
        credentials: 'include',
      });

      if (response.status === 401) {
        const refreshed = await refreshWithMutex();
        if (refreshed) {
          // Retry the original request
          return fetch(url, { ...init, credentials: 'include' });
        }
        config.onRefreshFailure?.();
      }

      return response;
    },
  };
}
