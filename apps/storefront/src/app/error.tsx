'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@xplaza/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Report to Sentry
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center'>
      <h1 className='text-4xl font-bold text-red-600'>Error</h1>
      <p className='mt-4 text-xl font-semibold'>Something went wrong</p>
      <p className='mt-2 text-muted-foreground'>
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className='mt-8 flex gap-4 justify-center'>
        <Button onClick={reset}>Try Again</Button>
        <Link href='/'>
          <Button variant='outline'>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
