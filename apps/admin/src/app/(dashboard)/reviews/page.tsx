'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { MessageSquare } from 'lucide-react';

export default function AdminReviewsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Review Moderation</h1>

      <div className='flex gap-2 mb-6'>
        {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => (
          <Button key={tab} variant={tab === 'All' ? 'default' : 'outline'} size='sm'>
            {tab}
          </Button>
        ))}
      </div>

      <Card className='p-8 text-center text-muted-foreground'>
        <MessageSquare className='h-10 w-10 mx-auto mb-3' />
        <p className='font-medium'>No Reviews to Moderate</p>
        <p className='text-sm mt-1'>Customer reviews pending approval will appear here.</p>
      </Card>
    </div>
  );
}
