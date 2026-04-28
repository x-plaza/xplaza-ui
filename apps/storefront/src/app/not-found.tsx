import Link from 'next/link';
import { Button } from '@xplaza/ui';

export default function NotFound() {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center'>
      <h1 className='text-6xl font-bold text-primary'>404</h1>
      <p className='mt-4 text-xl font-semibold'>Page Not Found</p>
      <p className='mt-2 text-muted-foreground'>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className='mt-8'>
        <Link href='/'>
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
