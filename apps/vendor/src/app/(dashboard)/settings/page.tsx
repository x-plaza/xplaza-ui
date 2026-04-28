'use client';

import { useState } from 'react';
import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';

export default function VendorSettingsPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Shop Settings</h1>

      <form onSubmit={handleSubmit} className='space-y-6 max-w-2xl'>
        {/* Shop Profile */}
        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>Shop Profile</h2>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Shop Name
            </label>
            <Input required placeholder='Your shop name' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Description
            </label>
            <textarea
              className='flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              placeholder='Tell customers about your shop'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>Phone</label>
              <Input type='tel' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>Email</label>
              <Input type='email' />
            </div>
          </div>
        </Card>

        {/* Business Address */}
        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>Business Address</h2>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Address Line 1
            </label>
            <Input />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>City</label>
              <Input />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Country
              </label>
              <Input />
            </div>
          </div>
        </Card>

        {/* Payout */}
        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>Payout Settings</h2>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Bank Account / Stripe Connect
            </label>
            <p className='text-sm text-muted-foreground'>
              Configure your payout method to receive earnings. Stripe Connect
              integration available.
            </p>
            <Button variant='outline' className='mt-2'>
              Connect Stripe
            </Button>
          </div>
        </Card>

        <Button type='submit' disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
}
