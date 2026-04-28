'use client';

import { useEffect } from 'react';
import { Button } from '@xplaza/ui';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Report to Sentry
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang='en'>
      <body className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center px-4'>
          <h1 className='text-4xl font-bold text-red-600'>500</h1>
          <p className='mt-4 text-xl font-semibold'>Something went wrong</p>
          <p className='mt-2 text-gray-500'>
            An unexpected error occurred. Please try again.
          </p>
          <div className='mt-8'>
            <Button onClick={reset}>Try Again</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
