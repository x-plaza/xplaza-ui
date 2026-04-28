'use client';

import { Card } from '@xplaza/ui';
import { MessageSquare } from 'lucide-react';

export default function VendorReviewsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Reviews</h1>

      {/* Stats */}
      <div className='grid grid-cols-3 gap-4 mb-6'>
        <Card className='p-4 text-center'>
          <p className='text-2xl font-bold'>0</p>
          <p className='text-xs text-muted-foreground'>Total Reviews</p>
        </Card>
        <Card className='p-4 text-center'>
          <p className='text-2xl font-bold'>—</p>
          <p className='text-xs text-muted-foreground'>Avg Rating</p>
        </Card>
        <Card className='p-4 text-center'>
          <p className='text-2xl font-bold'>0</p>
          <p className='text-xs text-muted-foreground'>Pending Response</p>
        </Card>
      </div>

      <Card className='p-8 text-center text-muted-foreground'>
        <MessageSquare className='h-10 w-10 mx-auto mb-3' />
        <p className='font-medium'>No Reviews Yet</p>
        <p className='text-sm mt-1'>
          Customer reviews for your products will appear here.
        </p>
      </Card>
    </div>
  );
}
