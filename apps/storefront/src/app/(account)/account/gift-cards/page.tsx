'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Gift, CreditCard } from 'lucide-react';
import { formatCurrency } from '@xplaza/utils';

export default function GiftCardsPage() {
  const [redeemCode, setRedeemCode] = useState('');
  const balance = 0;

  function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    // TODO: redeem gift card via API
    setRedeemCode('');
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Gift Cards' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Gift Cards</h1>

      {/* Balance */}
      <div className='bg-foreground text-white p-8 mb-6'>
        <div className='flex items-center gap-3 mb-2'>
          <Gift className='h-6 w-6' />
          <span className='text-sm opacity-80'>Gift Card Balance</span>
        </div>
        <p className='text-3xl font-bold'>{formatCurrency(balance)}</p>
      </div>

      {/* Redeem */}
      <div className='border p-6 mb-6'>
        <h2 className='font-semibold mb-4'>Redeem a Gift Card</h2>
        <form onSubmit={handleRedeem} className='flex gap-3'>
          <Input
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value)}
            placeholder='Enter gift card code'
            required
          />
          <Button type='submit'>Redeem</Button>
        </form>
      </div>

      {/* Transaction History */}
      <div className='border p-6'>
        <h2 className='font-semibold mb-4'>Transaction History</h2>
        <div className='text-center py-6 text-sm text-muted-foreground'>
          <CreditCard className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
          No gift card transactions yet.
        </div>
      </div>
    </div>
  );
}
