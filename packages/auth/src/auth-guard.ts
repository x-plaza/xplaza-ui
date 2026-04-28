export interface AuthGuardConfig {
  protectedPaths: string[];
  loginPath: string;
  isAuthenticated: () => boolean;
}

/**
 * Creates an auth guard that checks if the current path
 * requires authentication and redirects if needed.
 * Used primarily in Next.js middleware.
 */
export function createAuthGuard(config: AuthGuardConfig) {
  return {
    shouldRedirectToLogin(pathname: string): boolean {
      if (config.isAuthenticated()) return false;
      return config.protectedPaths.some(
        (p) => pathname === p || pathname.startsWith(p + '/')
      );
    },

    shouldRedirectFromLogin(pathname: string): boolean {
      if (!config.isAuthenticated()) return false;
      return pathname === config.loginPath;
    },

    getLoginUrl(callbackUrl: string): string {
      return `${config.loginPath}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    },
  };
}
