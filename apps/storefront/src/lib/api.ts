import { createApiClient } from '@xplaza/api-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

export const apiClient = createApiClient(API_URL);
