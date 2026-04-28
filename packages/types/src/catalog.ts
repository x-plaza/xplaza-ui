export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  sellingPrice: number;
  compareAtPrice?: number;
  currency: string;
  categoryId: number;
  categoryName?: string;
  brandId?: number;
  brandName?: string;
  shopId: number;
  shopName?: string;
  images: ProductImage[];
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];
  averageRating?: number;
  reviewCount?: number;
  inStock: boolean;
  quantity: number;
  gender?: string;
  featured?: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  url: string;
  altText?: string;
  position: number;
  isThumbnail: boolean;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  inStock: boolean;
  attributes: VariantAttribute[];
}

export interface VariantAttribute {
  name: string;
  value: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  parentName?: string;
  children?: Category[];
  productCount?: number;
  active: boolean;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  productCount?: number;
  active: boolean;
}

export interface Shop {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  rating?: number;
  reviewCount?: number;
  active: boolean;
}
