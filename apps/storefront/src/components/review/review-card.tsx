import { Star, ThumbsUp } from 'lucide-react';
import { cn } from '@xplaza/utils';
import { formatDate } from '@xplaza/utils';

interface ReviewCardProps {
  review: {
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
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className='border-b py-6 last:border-b-0'>
      <div className='flex items-center gap-3 mb-2'>
        <div className='flex gap-0.5'>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                'h-4 w-4',
                star <= review.rating
                  ? 'fill-foreground text-foreground'
                  : 'text-muted-foreground'
              )}
            />
          ))}
        </div>
        <span className='text-sm font-medium'>{review.title}</span>
      </div>

      <div className='flex items-center gap-2 text-xs text-muted-foreground mb-3'>
        <span>{review.author}</span>
        <span>&middot;</span>
        <span>{formatDate(review.createdAt)}</span>
        {review.verified && (
          <>
            <span>&middot;</span>
            <span className='text-green-600 font-medium'>
              Verified Purchase
            </span>
          </>
        )}
      </div>

      <p className='text-sm leading-relaxed'>{review.body}</p>

      {(review.pros?.length || review.cons?.length) && (
        <div className='grid grid-cols-2 gap-4 mt-3'>
          {review.pros && review.pros.length > 0 && (
            <div>
              <p className='text-xs font-medium text-green-600 mb-1'>Pros</p>
              <ul className='text-sm space-y-0.5'>
                {review.pros.map((pro, i) => (
                  <li key={i} className='flex items-start gap-1'>
                    <span className='text-green-600'>+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {review.cons && review.cons.length > 0 && (
            <div>
              <p className='text-xs font-medium text-red-600 mb-1'>Cons</p>
              <ul className='text-sm space-y-0.5'>
                {review.cons.map((con, i) => (
                  <li key={i} className='flex items-start gap-1'>
                    <span className='text-red-600'>-</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className='flex items-center gap-4 mt-3'>
        <button className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors'>
          <ThumbsUp className='h-3.5 w-3.5' />
          Helpful ({review.helpfulCount})
        </button>
      </div>
    </div>
  );
}
