export interface Review {
  id: number;
  productId: number;
  customerId: number;
  customerName: string;
  rating: number;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
  images?: string[];
  helpfulCount: number;
  verified: boolean;
  createdAt: string;
  vendorResponse?: VendorResponse;
}

export interface VendorResponse {
  comment: string;
  respondedAt: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}
