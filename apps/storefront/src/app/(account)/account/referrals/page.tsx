'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Copy, Gift } from 'lucide-react';

export default function ReferralsPage() {
  const referralCode = 'XPL-REF-00000';
  const referralLink = `https://xplaza.com/ref/${referralCode}`;
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Referrals' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Refer a Friend</h1>

      {/* Referral Banner */}
      <div className='bg-foreground text-white p-8 mb-6'>
        <div className='flex items-center gap-3 mb-3'>
          <Gift className='h-8 w-8' />
          <div>
            <p className='text-lg font-bold'>Give $10, Get $10</p>
            <p className='text-sm opacity-80'>
              Share your link and earn rewards when friends sign up and make
              their first purchase.
            </p>
          </div>
        </div>
      </div>

      {/* Share Link */}
      <div className='border p-6 mb-6'>
        <h2 className='font-semibold mb-3'>Your Referral Link</h2>
        <div className='flex gap-2'>
          <Input value={referralLink} readOnly />
          <Button variant='outline' className='gap-1.5' onClick={handleCopy}>
            <Copy className='h-4 w-4' />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className='border p-6'>
        <h2 className='font-semibold mb-4'>Your Referrals</h2>
        <div className='grid grid-cols-3 gap-4 text-center'>
          <div>
            <p className='text-2xl font-bold'>0</p>
            <p className='text-xs text-muted-foreground'>Invited</p>
          </div>
          <div>
            <p className='text-2xl font-bold'>0</p>
            <p className='text-xs text-muted-foreground'>Signed Up</p>
          </div>
          <div>
            <p className='text-2xl font-bold'>$0</p>
            <p className='text-xs text-muted-foreground'>Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
