export interface TokenManager {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setTokens: (access: string, refresh: string) => void;
  clearTokens: () => void;
}

/**
 * Creates a token manager for cookie-based auth (BFF pattern).
 * In the BFF pattern, tokens live in httpOnly cookies managed by
 * Next.js API routes — the client never sees raw JWTs.
 * This manager tracks the session state client-side.
 */
export function createTokenManager(): TokenManager {
  let sessionActive = false;

  return {
    getAccessToken() {
      // In BFF pattern, the access token is in an httpOnly cookie
      // and is attached by the browser automatically.
      // This returns a marker indicating session state.
      return sessionActive ? 'session-active' : null;
    },
    getRefreshToken() {
      return sessionActive ? 'session-active' : null;
    },
    setTokens() {
      sessionActive = true;
    },
    clearTokens() {
      sessionActive = false;
    },
  };
}
