'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Trophy, Star, ArrowUp } from 'lucide-react';

export default function LoyaltyPage() {
  const points = 0;
  const tier = 'Bronze';
  const nextTier = 'Silver';
  const pointsToNext = 500;

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Loyalty Program' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Loyalty Program</h1>

      {/* Points Card */}
      <div className='bg-foreground text-white p-8 mb-6'>
        <div className='flex items-center gap-3 mb-4'>
          <Trophy className='h-8 w-8' />
          <div>
            <p className='text-sm opacity-80'>Current Tier</p>
            <p className='text-2xl font-bold'>{tier}</p>
          </div>
        </div>
        <div className='flex items-baseline gap-2'>
          <span className='text-4xl font-bold'>{points}</span>
          <span className='opacity-80'>points</span>
        </div>
      </div>

      {/* Progress to next tier */}
      <div className='border p-6 mb-6'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2'>
            <ArrowUp className='h-4 w-4 text-primary' />
            <span className='text-sm font-medium'>
              Progress to {nextTier}
            </span>
          </div>
          <span className='text-sm text-muted-foreground'>
            {pointsToNext} points needed
          </span>
        </div>
        <div className='h-3 bg-muted rounded-full overflow-hidden'>
          <div
            className='h-full bg-primary rounded-full transition-all'
            style={{ width: `${Math.min((points / (points + pointsToNext)) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Tier Benefits */}
      <div className='border p-6'>
        <h2 className='font-semibold mb-4'>Tier Benefits</h2>
        <div className='space-y-3 text-sm'>
          {[
            { tier: 'Bronze', benefits: '1x points, birthday bonus' },
            { tier: 'Silver', benefits: '1.5x points, free shipping, early access' },
            { tier: 'Gold', benefits: '2x points, exclusive deals, priority support' },
            { tier: 'Platinum', benefits: '3x points, VIP events, personal shopper' },
          ].map((t) => (
            <div
              key={t.tier}
              className='flex items-start gap-3'
            >
              <Star className='h-4 w-4 text-primary mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium'>{t.tier}</p>
                <p className='text-muted-foreground'>{t.benefits}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
