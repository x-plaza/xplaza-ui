'use client';

import { Skeleton } from '@xplaza/ui';

interface RecommendationSectionProps {
  title: string;
  children: React.ReactNode;
}

export function RecommendationSection({
  title,
  children,
}: RecommendationSectionProps) {
  return (
    <section>
      <h2 className='text-lg font-bold mb-4'>{title}</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
        {children}
      </div>
    </section>
  );
}

export function RecommendationSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className='space-y-2'>
          <Skeleton className='aspect-square' />
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      ))}
    </>
  );
}
