/**
 * Mutex to prevent concurrent token refresh attempts.
 * When multiple requests get a 401, only one refresh call is made.
 */
let refreshPromise: Promise<boolean> | null = null;

export const refreshMutex = {
  /**
   * Execute a refresh function with mutex protection.
   * If a refresh is already in progress, subsequent calls
   * will wait for the same promise.
   */
  async execute(refreshFn: () => Promise<boolean>): Promise<boolean> {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = refreshFn().finally(() => {
      refreshPromise = null;
    });

    return refreshPromise;
  },
};
