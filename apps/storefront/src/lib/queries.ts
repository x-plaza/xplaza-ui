import type { Product, Category, Brand, ApiResponse, SearchResult, Review, ReviewSummary } from '@xplaza/types';
import { apiClient } from '@/lib/api';

// ── Backend → Frontend Mappers ────────────────────────────────────────────────
// The backend uses prefixed field names (productId, productName, etc.)
// while the frontend types use short names (id, name, etc.).

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapProduct(raw: any): Product {
  return {
    id: raw.productId ?? raw.id,
    name: raw.productName ?? raw.name ?? '',
    slug: raw.slug ?? `product-${raw.productId ?? raw.id}`,
    description: raw.productDescription ?? raw.description ?? '',
    sku: raw.sku ?? '',
    sellingPrice: raw.productSellingPrice ?? raw.productPrice ?? raw.sellingPrice ?? 0,
    compareAtPrice: raw.productBuyingPrice ?? raw.compareAtPrice,
    currency: raw.currencyCode ?? raw.currency ?? 'USD',
    categoryId: raw.categoryId,
    categoryName: raw.categoryName,
    brandId: raw.brandId,
    brandName: raw.brandName,
    shopId: raw.shopId,
    shopName: raw.shopName,
    images: (raw.images ?? []).map(mapProductImage),
    averageRating: raw.averageRating,
    reviewCount: raw.reviewCount,
    inStock: raw.quantity != null ? raw.quantity > 0 : (raw.inStock ?? true),
    quantity: raw.quantity ?? 0,
    featured: raw.isTrending ?? raw.featured ?? false,
    active: raw.isPublished ?? raw.active ?? true,
    gender: raw.gender,
    createdAt: raw.createdAt ?? '',
    updatedAt: raw.lastUpdatedAt ?? raw.updatedAt ?? '',
  };
}

function mapProductImage(raw: any) {
  return {
    id: raw.productImageId ?? raw.id ?? 0,
    url: raw.productImageUrl ?? raw.url ?? '',
    altText: raw.altText,
    position: raw.sortOrder ?? raw.position ?? 0,
    isThumbnail: raw.sortOrder === 1 || raw.isThumbnail || false,
  };
}

function mapCategory(raw: any): Category {
  return {
    id: raw.categoryId ?? raw.id,
    name: raw.categoryName ?? raw.name ?? '',
    slug: raw.slug ?? `category-${raw.categoryId ?? raw.id}`,
    description: raw.categoryDescription ?? raw.description,
    parentId: raw.parentCategoryId ?? raw.parentId,
    active: raw.active ?? true,
  };
}

function mapBrand(raw: any): Brand {
  return {
    id: raw.brandId ?? raw.id,
    name: raw.brandName ?? raw.name ?? '',
    slug: raw.slug ?? `brand-${raw.brandId ?? raw.id}`,
    description: raw.brandDescription ?? raw.description,
    active: raw.active ?? true,
  };
}

function mapListResponse<T>(response: ApiResponse<any[]>, mapper: (raw: any) => T): ApiResponse<T[]> {
  return {
    ...response,
    data: (response.data ?? []).map(mapper),
  };
}

function mapSingleResponse<T>(response: ApiResponse<any>, mapper: (raw: any) => T): ApiResponse<T> {
  return {
    ...response,
    data: response.data ? mapper(response.data) : undefined,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface ProductListParams {
  page?: number;
  size?: number;
  categoryId?: number;
  brandId?: number;
  shopId?: number;
  search?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  gender?: string;
}

// Map frontend sort field names to backend entity field names
const SORT_FIELD_MAP: Record<string, string> = {
  sellingPrice: 'productSellingPrice',
  name: 'productName',
  createdAt: 'createdAt',
  price: 'productSellingPrice',
};

export async function getProducts(params: ProductListParams = {}) {
  const backendSort = params.sort ? (SORT_FIELD_MAP[params.sort] ?? params.sort) : undefined;
  const backendDirection = params.direction?.toUpperCase() as 'ASC' | 'DESC' | undefined;
  const response = await apiClient.get<Product[]>('/products', {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 20,
      categoryId: params.categoryId,
      brandId: params.brandId,
      shopId: params.shopId,
      search: params.search,
      sort: backendSort,
      direction: backendDirection,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      gender: params.gender,
    },
  });
  return mapListResponse(response, mapProduct);
}

export async function getProduct(id: number) {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return mapSingleResponse(response, mapProduct);
}

export async function getCategories(params: { parentId?: number; search?: string; page?: number; size?: number } = {}) {
  const response = await apiClient.get<Category[]>('/categories', {
    params: {
      parentId: params.parentId,
      search: params.search,
      page: params.page ?? 0,
      size: params.size ?? 50,
    },
  });
  return mapListResponse(response, mapCategory);
}

export async function getCategory(id: number) {
  const response = await apiClient.get<Category>(`/categories/${id}`);
  return mapSingleResponse(response, mapCategory);
}

export async function getBrands(params: { search?: string; page?: number; size?: number } = {}) {
  const response = await apiClient.get<Brand[]>('/brands', {
    params: {
      search: params.search,
      page: params.page ?? 0,
      size: params.size ?? 50,
    },
  });
  return mapListResponse(response, mapBrand);
}

export async function getBrand(id: number) {
  const response = await apiClient.get<Brand>(`/brands/${id}`);
  return mapSingleResponse(response, mapBrand);
}

export async function searchProducts(params: {
  q: string;
  page?: number;
  size?: number;
  categoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) {
  const response = await apiClient.get<SearchResult<Product>>('/search/products/faceted', {
    params: {
      q: params.q,
      page: params.page ?? 0,
      size: params.size ?? 20,
      categoryId: params.categoryId,
      brandId: params.brandId,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      sort: params.sort,
    },
  });
  if (response.data?.hits) {
    response.data.hits = response.data.hits.map((h: any) => mapProduct(h));
  }
  return response;
}

export async function getAutocomplete(q: string, limit = 5) {
  return apiClient.get<{ suggestions: Array<{ text: string; type: string; id?: number; slug?: string }> }>(
    '/search/autocomplete',
    { params: { q, limit } }
  );
}

// ── Product Reviews ───────────────────────────────────────────────────────────

export async function getProductReviews(productId: number, params: { page?: number; size?: number } = {}) {
  return apiClient.get<Review[]>(`/products/${productId}/reviews`, {
    params: { page: params.page ?? 0, size: params.size ?? 10 },
  });
}

export async function getProductReviewSummary(productId: number) {
  return apiClient.get<ReviewSummary>(`/products/${productId}/reviews/summary`);
}

// ── Orders ────────────────────────────────────────────────────────────────────

export interface Order {
  id: number;
  orderNumber: string;
  status: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
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
  isDefault?: boolean;
}

export async function getOrders(params: { page?: number; size?: number; status?: string } = {}) {
  return apiClient.get<Order[]>('/customers/me/orders', {
    params: { page: params.page ?? 0, size: params.size ?? 10, status: params.status },
  });
}

export async function getOrder(id: number) {
  return apiClient.get<Order>(`/customers/me/orders/${id}`);
}

// ── Wishlist ──────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: number;
  productId: number;
  productName: string;
  productImage?: string;
  sellingPrice: number;
  compareAtPrice?: number;
  currency: string;
  inStock: boolean;
  addedAt: string;
}

export async function getWishlistItems(params: { page?: number; size?: number } = {}) {
  return apiClient.get<WishlistItem[]>('/customers/me/wishlists', {
    params: { page: params.page ?? 0, size: params.size ?? 20 },
  });
}

export async function addToWishlist(productId: number) {
  return apiClient.post<WishlistItem>('/customers/me/wishlists', {
    body: { productId },
  });
}

export async function removeFromWishlist(productId: number) {
  return apiClient.delete<void>(`/customers/me/wishlists/${productId}`);
}

// ── Addresses ─────────────────────────────────────────────────────────────────

export async function getAddresses() {
  return apiClient.get<Address[]>('/customers/me/addresses');
}

export async function createAddress(data: Omit<Address, 'id'>) {
  return apiClient.post<Address>('/customers/me/addresses', { body: data });
}

export async function updateAddress(id: number, data: Partial<Address>) {
  return apiClient.put<Address>(`/customers/me/addresses/${id}`, { body: data });
}

export async function deleteAddress(id: number) {
  return apiClient.delete<void>(`/customers/me/addresses/${id}`);
}

// ── Profile ───────────────────────────────────────────────────────────────────

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
}

export async function updateProfile(data: Partial<ProfileData>) {
  return apiClient.put<ProfileData>('/customers/me/profile', { body: data });
}

export async function changePassword(currentPassword: string, newPassword: string) {
  return apiClient.post<void>('/customers/me/change-password', {
    body: { currentPassword, newPassword },
  });
}

// ── Notifications ─────────────────────────────────────────────────────────────

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export async function getNotifications(params: { page?: number; size?: number } = {}) {
  return apiClient.get<Notification[]>('/customers/me/notifications', {
    params: { page: params.page ?? 0, size: params.size ?? 20 },
  });
}

export async function markNotificationRead(id: number) {
  return apiClient.put<void>(`/customers/me/notifications/${id}/read`);
}

// ── User Reviews ──────────────────────────────────────────────────────────────

export async function getUserReviews(params: { page?: number; size?: number } = {}) {
  return apiClient.get<Review[]>('/customers/me/reviews', {
    params: { page: params.page ?? 0, size: params.size ?? 10 },
  });
}

// ── Auth (public) ─────────────────────────────────────────────────────────────

export async function forgotPassword(email: string) {
  return apiClient.post<void>('/customer/auth/forgot-password', { body: { email } });
}

export async function resetPassword(token: string, newPassword: string) {
  return apiClient.post<void>('/customer/auth/reset-password', { body: { token, newPassword } });
}

export async function verifyEmail(token: string) {
  return apiClient.post<void>('/customer/auth/verify-email', { body: { token } });
}
