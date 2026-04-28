'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Image as ImageIcon } from 'lucide-react';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { cn } from '@xplaza/utils';

interface ReviewFormProps {
  productId: string;
  onSubmit?: () => void;
}

const DIMENSIONS = [
  'Quality',
  'Value for Money',
  'Design',
  'Durability',
];

export function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [dimensionRatings, setDimensionRatings] = useState<
    Record<string, number>
  >({});
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (overallRating === 0) return;
    setLoading(true);
    // TODO: submit via API
    console.log({
      productId,
      overallRating,
      dimensionRatings,
      title,
      body,
      pros: pros.split('\n').filter(Boolean),
      cons: cons.split('\n').filter(Boolean),
    });
    setTimeout(() => {
      setLoading(false);
      onSubmit?.();
    }, 800);
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Overall Rating */}
      <div>
        <label className='block text-sm font-medium mb-2'>
          Overall Rating *
        </label>
        <div className='flex gap-1'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type='button'
              onClick={() => setOverallRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className='p-0.5'
            >
              <Star
                className={cn(
                  'h-7 w-7 transition-colors',
                  star <= (hoverRating || overallRating)
                    ? 'fill-foreground text-foreground'
                    : 'text-muted-foreground'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Dimension Ratings */}
      <div className='space-y-3'>
        <label className='block text-sm font-medium'>
          Rate specific aspects
        </label>
        {DIMENSIONS.map((dim) => (
          <div key={dim} className='flex items-center gap-3'>
            <span className='text-sm w-32'>{dim}</span>
            <div className='flex gap-0.5'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() =>
                    setDimensionRatings((prev) => ({ ...prev, [dim]: star }))
                  }
                  className='p-0.5'
                >
                  <Star
                    className={cn(
                      'h-4 w-4',
                      star <= (dimensionRatings[dim] || 0)
                        ? 'fill-foreground text-foreground'
                        : 'text-muted-foreground'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Title & Body */}
      <div>
        <label className='block text-sm font-medium mb-1.5'>
          Review Title
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Summarize your experience'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1.5'>
          Your Review *
        </label>
        <textarea
          className='flex min-h-[100px] w-full border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Share your experience with this product...'
          required
        />
      </div>

      {/* Pros & Cons */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='flex items-center gap-1.5 text-sm font-medium mb-1.5'>
            <ThumbsUp className='h-3.5 w-3.5 text-green-600' />
            Pros
          </label>
          <textarea
            className='flex min-h-[80px] w-full border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground'
            value={pros}
            onChange={(e) => setPros(e.target.value)}
            placeholder='One per line'
          />
        </div>
        <div>
          <label className='flex items-center gap-1.5 text-sm font-medium mb-1.5'>
            <ThumbsDown className='h-3.5 w-3.5 text-red-600' />
            Cons
          </label>
          <textarea
            className='flex min-h-[80px] w-full border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground'
            value={cons}
            onChange={(e) => setCons(e.target.value)}
            placeholder='One per line'
          />
        </div>
      </div>

      {/* Image Upload Placeholder */}
      <div>
        <label className='block text-sm font-medium mb-1.5'>
          Add Photos (Optional)
        </label>
        <div className='border-dashed border-2 p-6 text-center text-sm text-muted-foreground'>
          <ImageIcon className='h-8 w-8 mx-auto mb-2' />
          <p>Drag & drop images or click to upload</p>
          <p className='text-xs mt-1'>Max 5 images, 5MB each</p>
        </div>
      </div>

      <Button type='submit' disabled={loading || overallRating === 0}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
