'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Skeleton } from '@xplaza/ui';
import { Star, MessageSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getUserReviews } from '@/lib/queries';
import type { Review } from '@xplaza/types';

export default function MyReviewsPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['user-reviews'],
    queryFn: () => getUserReviews(),
  });

  const reviews: Review[] = response?.data ?? [];

  if (isLoading) {
    return (
      <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs
          items={[
            { label: 'My Account', href: '/account' },
            { label: 'My Reviews' },
          ]}
        />
        <h1 className='text-2xl font-bold mb-6'>My Reviews</h1>
        <div className='space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='h-20' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'My Reviews' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>My Reviews</h1>

      {reviews.length === 0 ? (
        <div className='text-center py-12 border'>
          <MessageSquare className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
          <p className='font-medium'>No Reviews Yet</p>
          <p className='text-sm text-muted-foreground mt-1'>
            After purchasing a product, you can leave a review here.
          </p>
        </div>
      ) : (
        <div className='space-y-4'>
          {reviews.map((review) => (
            <div key={review.id} className='border p-4'>
              <div className='flex items-center gap-2 mb-1'>
                <div className='flex'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className='text-xs text-muted-foreground'>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              {review.title && (
                <p className='font-medium text-sm'>{review.title}</p>
              )}
              {review.comment && (
                <p className='text-sm text-muted-foreground mt-1'>
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
