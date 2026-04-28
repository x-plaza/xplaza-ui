'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Tag, Plus } from 'lucide-react';

export default function VendorPromotionsPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Promotions</h1>
        <Button size='sm' className='gap-1.5'>
          <Plus className='h-4 w-4' />
          Create Coupon
        </Button>
      </div>

      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Code
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Discount
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Uses
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Valid Until
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Status
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={6}
                className='px-4 py-12 text-center text-sm text-muted-foreground'
              >
                <Tag className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                No promotions yet. Create a coupon to attract more customers.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
