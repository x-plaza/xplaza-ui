import type { ApiResponse } from '@xplaza/types';

export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

function buildUrl(
  baseUrl: string,
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const segment = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${base}${segment}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

export function createApiClient(baseUrl: string) {
  async function request<T>(
    method: string,
    path: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, body, headers: customHeaders, ...rest } = options;

    const url = buildUrl(baseUrl, path, params);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...((customHeaders as Record<string, string>) ?? {}),
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as ApiResponse<never> | null;
      throw new HttpError(
        response.status,
        errorBody?.error?.code ?? 'UNKNOWN_ERROR',
        errorBody?.error?.message ?? response.statusText,
        errorBody?.error?.details
      );
    }

    if (response.status === 204) {
      return { success: true } as ApiResponse<T>;
    }

    return response.json() as Promise<ApiResponse<T>>;
  }

  return {
    get: <T>(path: string, options?: RequestOptions) =>
      request<T>('GET', path, options),
    post: <T>(path: string, options?: RequestOptions) =>
      request<T>('POST', path, options),
    put: <T>(path: string, options?: RequestOptions) =>
      request<T>('PUT', path, options),
    patch: <T>(path: string, options?: RequestOptions) =>
      request<T>('PATCH', path, options),
    delete: <T>(path: string, options?: RequestOptions) =>
      request<T>('DELETE', path, options),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
