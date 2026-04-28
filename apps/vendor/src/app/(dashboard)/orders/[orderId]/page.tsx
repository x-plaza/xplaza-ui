'use client';

import { useParams } from 'next/navigation';
import { Button } from '@xplaza/ui';
import { Badge } from '@xplaza/ui';
import { Card } from '@xplaza/ui';
import { ArrowLeft, Truck, Package, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function VendorOrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div>
      <div className='flex items-center gap-3 mb-6'>
        <Link href='/orders'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <h1 className='text-2xl font-bold'>Order #{orderId}</h1>
        <Badge variant='secondary'>Pending</Badge>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-2 mb-6'>
        <Button size='sm' className='gap-1.5'>
          <Package className='h-4 w-4' />
          Process Order
        </Button>
        <Button size='sm' variant='outline' className='gap-1.5'>
          <Truck className='h-4 w-4' />
          Mark Shipped
        </Button>
        <Button size='sm' variant='outline' className='gap-1.5'>
          <CheckCircle className='h-4 w-4' />
          Mark Delivered
        </Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Order Items */}
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Order Items</h2>
          <p className='text-sm text-muted-foreground'>
            Order item details will appear here when the API is integrated.
          </p>
        </Card>

        {/* Customer & Shipping */}
        <div className='space-y-6'>
          <Card className='p-6'>
            <h2 className='font-semibold mb-4'>Customer</h2>
            <p className='text-sm text-muted-foreground'>
              Customer details will appear here.
            </p>
          </Card>
          <Card className='p-6'>
            <h2 className='font-semibold mb-4'>Shipping Address</h2>
            <p className='text-sm text-muted-foreground'>
              Shipping address will appear here.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
