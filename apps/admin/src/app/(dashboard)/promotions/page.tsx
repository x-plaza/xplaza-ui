'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Percent, Plus } from 'lucide-react';

export default function AdminPromotionsPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Promotions & Campaigns</h1>
        <Button size='sm' className='gap-1.5'>
          <Plus className='h-4 w-4' />
          Create Campaign
        </Button>
      </div>

      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Name</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Type</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Discount</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Uses</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Dates</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className='px-4 py-12 text-center text-sm text-muted-foreground'>
                <Percent className='h-8 w-8 mx-auto mb-2' />
                No promotions created yet.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
