import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ProductImageGallery } from '@/components/product/product-image-gallery';
import { ProductAccordion } from '@/components/product/product-accordion';
import { PriceDisplay } from '@/components/product/price-display';
import { StarRating } from '@/components/product/star-rating';
import { ProductCarousel } from '@/components/product/product-carousel';
import { AddToCart } from '@/components/product/add-to-cart';
import { Skeleton } from '@xplaza/ui';
import { Truck, RotateCcw } from 'lucide-react';
import { getProduct, getProducts, getProductReviews, getProductReviewSummary } from '@/lib/queries';

export const revalidate = 300;

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await getProduct(Number(id));
    const product = response.data;
    if (!product) return { title: 'Product Not Found' };

    return {
      title: product.name,
      description: product.shortDescription ?? product.description?.slice(0, 160),
      openGraph: {
        title: product.name,
        description: product.shortDescription ?? product.description?.slice(0, 160),
        images: product.images?.[0]?.url ? [product.images[0].url] : [],
        type: 'website',
      },
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  let product;
  try {
    const response = await getProduct(Number(id));
    product = response.data;
  } catch {
    notFound();
  }
  if (!product) notFound();

  // Fetch reviews in parallel
  const [reviewsResponse, reviewSummaryResponse] = await Promise.all([
    getProductReviews(product.id, { page: 0, size: 5 }).catch(() => null),
    getProductReviewSummary(product.id).catch(() => null),
  ]);
  const reviews = reviewsResponse?.data ?? [];
  const reviewSummary = reviewSummaryResponse?.data ?? null;

  const breadcrumbs = [
    { label: 'Products', href: '/products' },
    ...(product.categoryName
      ? [
          {
            label: product.categoryName,
            href: `/products?categoryId=${product.categoryId}`,
          },
        ]
      : []),
    { label: product.name },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.map((img) => img.url),
    sku: product.sku,
    brand: product.brandName
      ? { '@type': 'Brand', name: product.brandName }
      : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.sellingPrice,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating:
      product.averageRating && product.reviewCount
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.averageRating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  };

  // Build accordion items
  const accordionItems = [
    ...(product.description
      ? [
          {
            title: 'Details',
            content: <p>{product.description}</p>,
            defaultOpen: true,
          },
        ]
      : []),
    ...(product.attributes && product.attributes.length > 0
      ? [
          {
            title: 'Material & care',
            content: (
              <dl className='space-y-2'>
                {product.attributes.map((attr, i) => (
                  <div key={i} className='flex gap-2'>
                    <dt className='font-medium min-w-28'>{attr.name}</dt>
                    <dd>{attr.value}</dd>
                  </div>
                ))}
              </dl>
            ),
          },
        ]
      : []),
    {
      title: 'Size & fit',
      content: <p>Refer to the brand&apos;s size guide for the best fit.</p>,
    },
    ...(product.averageRating != null && product.averageRating > 0
      ? [
          {
            title: `Reviews (${reviewSummary?.totalReviews ?? product.reviewCount ?? 0})`,
            content: (
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <StarRating rating={reviewSummary?.averageRating ?? product.averageRating} showValue />
                  <span className='text-sm text-muted-foreground'>
                    based on {reviewSummary?.totalReviews ?? product.reviewCount ?? 0} reviews
                  </span>
                </div>
                {reviews.length > 0 && (
                  <div className='space-y-3 divide-y'>
                    {reviews.map((review) => (
                      <div key={review.id} className='pt-3 first:pt-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <StarRating rating={review.rating} size='sm' />
                          <span className='text-xs text-muted-foreground'>
                            {review.customerName} &middot;{' '}
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                          {review.verified && (
                            <span className='text-xs bg-green-50 text-green-700 px-1.5 py-0.5'>
                              Verified
                            </span>
                          )}
                        </div>
                        {review.title && (
                          <p className='text-sm font-medium'>{review.title}</p>
                        )}
                        {review.comment && (
                          <p className='text-sm text-muted-foreground'>{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  // Estimated delivery range
  const now = new Date();
  const deliveryMin = new Date(now.getTime() + 3 * 86400000);
  const deliveryMax = new Date(now.getTime() + 6 * 86400000);
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10'>
        <Breadcrumbs items={breadcrumbs} />

        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Images — vertical thumbnails left, main image right */}
          <div className='relative'>
            <ProductImageGallery
              images={product.images ?? []}
              productName={product.name}
            />
          </div>

          {/* Product info */}
          <div className='lg:max-w-md'>
            {product.brandName && (
              <p className='text-[13px] font-bold uppercase tracking-wide text-muted-foreground'>
                {product.brandName}
              </p>
            )}
            <h1 className='text-xl lg:text-2xl font-bold mt-1'>
              {product.name}
            </h1>

            {product.averageRating != null && product.averageRating > 0 && (
              <div className='flex items-center gap-2 mt-2'>
                <StarRating rating={product.averageRating} showValue />
                {product.reviewCount != null && (
                  <span className='text-[13px] text-muted-foreground'>
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}

            <div className='mt-4'>
              <PriceDisplay
                sellingPrice={product.sellingPrice}
                compareAtPrice={product.compareAtPrice}
                currency={product.currency}
                size='lg'
              />
              {product.compareAtPrice &&
                product.compareAtPrice > product.sellingPrice && (
                  <span className='text-[13px] text-accent font-bold ml-2'>
                    -
                    {Math.round(
                      ((product.compareAtPrice - product.sellingPrice) /
                        product.compareAtPrice) *
                        100
                    )}
                    %
                  </span>
                )}
            </div>

            {/* Interactive: variant selection, sizes, add to cart */}
            <AddToCart
              productId={product.id}
              productName={product.name}
              inStock={product.inStock}
              variants={product.variants}
              sellingPrice={product.sellingPrice}
              currency={product.currency}
            />

            {/* Delivery info */}
            <div className='mt-6 space-y-3 text-[13px]'>
              <div className='flex items-start gap-3'>
                <Truck className='h-4 w-4 mt-0.5 flex-shrink-0' />
                <div>
                  <p className='font-bold'>
                    Estimated delivery: {dateFormat.format(deliveryMin)} –{' '}
                    {dateFormat.format(deliveryMax)}
                  </p>
                  <p className='text-muted-foreground'>
                    Free delivery on orders over $50
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <RotateCcw className='h-4 w-4 mt-0.5 flex-shrink-0' />
                <p>Free 30-day returns</p>
              </div>
            </div>

            {/* Shop Info */}
            {product.shopName && (
              <div className='mt-6 pt-4 border-t'>
                <p className='text-[13px] text-muted-foreground'>
                  Sold by{' '}
                  <span className='font-semibold text-foreground'>
                    {product.shopName}
                  </span>
                </p>
              </div>
            )}

            {/* Accordions — Details, Material & care, Size & fit, Reviews */}
            <div className='mt-6'>
              <ProductAccordion items={accordionItems} />
            </div>
          </div>
        </div>

        {/* Related Products — horizontal carousel */}
        <div className='mt-16 border-t pt-10 pb-12'>
          <h2 className='text-xl font-bold mb-6'>You may also like</h2>
          <Suspense
            fallback={
              <div className='flex gap-4 overflow-hidden'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className='flex-shrink-0 w-[260px] space-y-3'>
                    <Skeleton className='aspect-[3/4]' />
                    <Skeleton className='h-3 w-3/4' />
                    <Skeleton className='h-3 w-1/2' />
                  </div>
                ))}
              </div>
            }
          >
            <RelatedProducts
              categoryId={product.categoryId}
              excludeId={product.id}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function RelatedProducts({
  categoryId,
  excludeId,
}: {
  categoryId: number;
  excludeId: number;
}) {
  try {
    const response = await getProducts({ categoryId, size: 8 });
    const products = (response.data ?? []).filter((p) => p.id !== excludeId);
    return <ProductCarousel products={products.slice(0, 8)} />;
  } catch {
    return null;
  }
}
