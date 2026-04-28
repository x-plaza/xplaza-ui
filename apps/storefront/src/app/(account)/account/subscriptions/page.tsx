'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import Link from 'next/link';
import { Repeat } from 'lucide-react';

export default function SubscriptionsPage() {
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Subscriptions' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Subscriptions</h1>

      <div className='text-center py-12 border'>
        <Repeat className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
        <p className='font-medium'>No Active Subscriptions</p>
        <p className='text-sm text-muted-foreground mt-1'>
          Subscribe to products for automatic recurring delivery.
        </p>
        <Button variant='outline' className='mt-4' asChild>
          <Link href='/products'>Browse Products</Link>
        </Button>
      </div>
    </div>
  );
}
