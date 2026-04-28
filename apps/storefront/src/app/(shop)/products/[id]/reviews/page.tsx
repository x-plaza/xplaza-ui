import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ReviewCard } from '@/components/review/review-card';
import { ReviewForm } from '@/components/review/review-form';
import { StarRating } from '@/components/product/star-rating';
import { getProduct } from '@/lib/queries';

interface ProductReviewsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductReviewsPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await getProduct(Number(id));
    const product = response.data;
    if (!product) return { title: 'Product Not Found' };
    return {
      title: `Reviews — ${product.name}`,
      description: `Read all reviews for ${product.name} on X-Plaza.`,
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

export default async function ProductReviewsPage({
  params,
}: ProductReviewsPageProps) {
  const { id } = await params;
  let product;

  try {
    const response = await getProduct(Number(id));
    product = response.data;
  } catch {
    notFound();
  }

  if (!product) notFound();

  const breadcrumbs = [
    { label: 'Products', href: '/products' },
    { label: product.name, href: `/products/${product.id}` },
    { label: 'Reviews' },
  ];

  // TODO: Fetch paginated reviews from API
  const reviews: Array<{
    id: string;
    author: string;
    rating: number;
    title: string;
    body: string;
    pros?: string[];
    cons?: string[];
    helpfulCount: number;
    createdAt: string;
    verified?: boolean;
  }> = [];

  return (
    <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8'>
      <Breadcrumbs items={breadcrumbs} />

      <div className='mt-6 mb-8'>
        <h1 className='text-2xl font-bold'>
          Reviews for {product.name}
        </h1>
        {product.averageRating != null && product.averageRating > 0 && (
          <div className='flex items-center gap-3 mt-2'>
            <StarRating rating={product.averageRating} />
            <span className='text-sm text-muted-foreground'>
              {product.averageRating.toFixed(1)} out of 5 ({product.reviewCount ?? 0}{' '}
              reviews)
            </span>
          </div>
        )}
      </div>

      {/* Review Form */}
      <div className='mb-10'>
        <h2 className='text-lg font-semibold mb-4'>Write a Review</h2>
        <ReviewForm productId={String(product.id)} />
      </div>

      {/* Reviews list */}
      <div>
        <h2 className='text-lg font-semibold mb-4'>
          All Reviews ({reviews.length})
        </h2>
        {reviews.length > 0 ? (
          <div className='space-y-4'>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className='text-muted-foreground py-8 text-center'>
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>

      <div className='mt-8'>
        <Link
          href={`/products/${product.id}`}
          className='text-primary hover:underline text-sm'
        >
          ← Back to product
        </Link>
      </div>
    </div>
  );
}
