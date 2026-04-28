'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Gift, Plus } from 'lucide-react';

export default function AdminGiftCardsPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Gift Cards</h1>
        <Button size='sm' className='gap-1.5'>
          <Plus className='h-4 w-4' />
          Issue Gift Card
        </Button>
      </div>

      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Code</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Initial Value</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Balance</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Assigned To</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Expires</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className='px-4 py-12 text-center text-sm text-muted-foreground'>
                <Gift className='h-8 w-8 mx-auto mb-2' />
                No gift cards issued yet.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
