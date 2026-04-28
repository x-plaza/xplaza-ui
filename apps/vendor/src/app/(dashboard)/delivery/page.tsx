'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Truck, Plus, Clock, Calendar } from 'lucide-react';

export default function VendorDeliveryPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Delivery Schedules</h1>
        <Button size='sm' className='gap-1.5'>
          <Plus className='h-4 w-4' />
          Add Schedule
        </Button>
      </div>

      <Card className='p-8 text-center text-muted-foreground'>
        <Calendar className='h-10 w-10 mx-auto mb-3' />
        <p className='font-medium'>No Delivery Schedules</p>
        <p className='text-sm mt-1'>
          Configure delivery time slots and schedules for your shop.
        </p>
      </Card>
    </div>
  );
}
