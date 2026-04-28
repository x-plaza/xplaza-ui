'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Truck } from 'lucide-react';

export default function AdminFulfillmentPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Fulfillment</h1>

      <div className='flex gap-2 mb-6'>
        {['Shipments', 'Returns', 'Carriers', 'Warehouses'].map((tab) => (
          <Button key={tab} variant={tab === 'Shipments' ? 'default' : 'outline'} size='sm'>
            {tab}
          </Button>
        ))}
      </div>

      <Card className='p-8 text-center text-muted-foreground'>
        <Truck className='h-10 w-10 mx-auto mb-3' />
        <p className='font-medium'>No Shipments</p>
        <p className='text-sm mt-1'>Shipment tracking will appear here.</p>
      </Card>
    </div>
  );
}
