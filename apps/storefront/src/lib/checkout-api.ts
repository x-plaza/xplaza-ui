import type { ApiResponse } from '@xplaza/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

export interface CheckoutSession {
  id: number;
  cartId: number;
  customerId: number;
  status: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  shippingMethod?: ShippingMethod;
  deliverySchedule?: DeliverySchedule;
  paymentMethod?: string;
  couponCode?: string;
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  notes?: string;
}

export interface Address {
  id?: number;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  cost: number;
  estimatedDays: number;
}

export interface DeliverySchedule {
  date: string;
  timeSlot?: string;
}

async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return res.json();
}

export async function startCheckout(cartId: number, customerId: number) {
  return fetchJson<CheckoutSession>(`${API_URL}/checkout/start`, {
    method: 'POST',
    body: JSON.stringify({ cartId, customerId }),
  });
}

export async function getCheckout(checkoutId: number) {
  return fetchJson<CheckoutSession>(`${API_URL}/checkout/${checkoutId}`);
}

export async function setShippingAddress(
  checkoutId: number,
  address: Address
) {
  return fetchJson<CheckoutSession>(
    `${API_URL}/checkout/${checkoutId}/shipping-address`,
    { method: 'PUT', body: JSON.stringify(address) }
  );
}

export async function setShippingMethod(
  checkoutId: number,
  shippingMethodId: number
) {
  return fetchJson<CheckoutSession>(
    `${API_URL}/checkout/${checkoutId}/shipping-method`,
    { method: 'PUT', body: JSON.stringify({ shippingMethodId }) }
  );
}

export async function setDeliverySchedule(
  checkoutId: number,
  schedule: DeliverySchedule
) {
  return fetchJson<CheckoutSession>(
    `${API_URL}/checkout/${checkoutId}/delivery-schedule`,
    { method: 'PUT', body: JSON.stringify(schedule) }
  );
}

export async function setPaymentMethod(
  checkoutId: number,
  paymentMethod: string
) {
  return fetchJson<CheckoutSession>(
    `${API_URL}/checkout/${checkoutId}/payment-method`,
    { method: 'PUT', body: JSON.stringify({ paymentMethod }) }
  );
}

export async function setCheckoutNotes(
  checkoutId: number,
  notes: string
) {
  return fetchJson<CheckoutSession>(
    `${API_URL}/checkout/${checkoutId}/notes`,
    { method: 'PUT', body: JSON.stringify({ notes }) }
  );
}

export async function completeCheckout(checkoutId: number, idempotencyKey: string) {
  return fetchJson<{ orderId: number }>(
    `${API_URL}/checkout/${checkoutId}/complete`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
    }
  );
}
