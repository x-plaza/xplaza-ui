'use client';

import { Card } from '@xplaza/ui';
import { Badge } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { ShoppingCart } from 'lucide-react';

export default function VendorOrdersPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Orders</h1>

      {/* Filter tabs */}
      <div className='flex gap-2 mb-6'>
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(
          (tab) => (
            <Button
              key={tab}
              variant={tab === 'All' ? 'default' : 'outline'}
              size='sm'
            >
              {tab}
            </Button>
          )
        )}
      </div>

      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Order #
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Customer
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Items
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Total
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Status
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Date
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={7}
                className='px-4 py-12 text-center text-sm text-muted-foreground'
              >
                <ShoppingCart className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                No orders yet.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
