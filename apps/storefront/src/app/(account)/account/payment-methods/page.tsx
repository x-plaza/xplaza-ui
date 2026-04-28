'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '@xplaza/ui';

export default function PaymentMethodsPage() {
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Payment Methods' },
        ]}
      />
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Payment Methods</h1>
        <Button size='sm' className='gap-1'>
          <Plus className='h-4 w-4' />
          Add Card
        </Button>
      </div>

      <div className='text-center py-12 border'>
        <CreditCard className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
        <p className='font-medium'>No Saved Payment Methods</p>
        <p className='text-sm text-muted-foreground mt-1'>
          Add a card for faster checkout.
        </p>
      </div>
    </div>
  );
}
