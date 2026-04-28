import type { ApiResponse } from '@xplaza/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImage?: string;
  variantId?: number;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  inStock: boolean;
  savedForLater: boolean;
}

export interface Cart {
  id: number;
  customerId?: number;
  sessionId?: string;
  items: CartItem[];
  savedForLaterItems: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  couponCode?: string;
  itemCount: number;
}

async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return { success: true } as ApiResponse<T>;
  return res.json();
}

export async function getCart(cartId: number) {
  return fetchJson<Cart>(`${API_URL}/carts/${cartId}`);
}

export async function getOrCreateCart(customerId: number) {
  return fetchJson<Cart>(`${API_URL}/carts/customer/${customerId}`, {
    method: 'POST',
  });
}

export async function getOrCreateGuestCart(sessionId: string) {
  return fetchJson<Cart>(`${API_URL}/carts/session/${sessionId}`, {
    method: 'POST',
  });
}

export async function addToCart(
  cartId: number,
  productId: number,
  quantity: number,
  variantId?: number
) {
  return fetchJson<Cart>(`${API_URL}/carts/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({ productId, quantity, variantId }),
  });
}

export async function updateCartItem(
  cartId: number,
  itemId: number,
  quantity: number
) {
  return fetchJson<Cart>(`${API_URL}/carts/${cartId}/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(cartId: number, itemId: number) {
  return fetchJson<Cart>(`${API_URL}/carts/${cartId}/items/${itemId}`, {
    method: 'DELETE',
  });
}

export async function saveForLater(cartId: number, itemId: number) {
  return fetchJson<Cart>(
    `${API_URL}/carts/${cartId}/items/${itemId}/save-for-later`,
    { method: 'POST' }
  );
}

export async function moveToCart(cartId: number, itemId: number) {
  return fetchJson<Cart>(
    `${API_URL}/carts/${cartId}/items/${itemId}/move-to-cart`,
    { method: 'POST' }
  );
}

export async function applyCoupon(cartId: number, couponCode: string) {
  return fetchJson<Cart>(`${API_URL}/carts/${cartId}/coupon`, {
    method: 'POST',
    body: JSON.stringify({ couponCode }),
  });
}

export async function removeCoupon(cartId: number) {
  return fetchJson<Cart>(`${API_URL}/carts/${cartId}/coupon`, {
    method: 'DELETE',
  });
}

export async function mergeGuestCart(
  sessionId: string,
  customerId: number
) {
  return fetchJson<Cart>(`${API_URL}/carts/${sessionId}/merge/${customerId}`, {
    method: 'POST',
  });
}
