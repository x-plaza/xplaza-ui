import { Star, StarHalf } from 'lucide-react';
import { cn } from '@xplaza/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], 'fill-foreground text-foreground')}
        />
      );
    } else if (i - 0.5 <= rating) {
      stars.push(
        <StarHalf
          key={i}
          className={cn(sizeClasses[size], 'fill-foreground text-foreground')}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], 'text-muted-foreground/30')}
        />
      );
    }
  }

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {stars}
      {showValue && (
        <span className='ml-1 text-sm font-medium'>{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
