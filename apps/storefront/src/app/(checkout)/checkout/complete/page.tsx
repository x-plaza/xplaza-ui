'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@xplaza/ui';
import { CheckCircle, Package } from 'lucide-react';

export default function CheckoutCompletePage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className='mx-auto max-w-lg px-4 py-16 text-center'>
      <CheckCircle className='h-16 w-16 text-green-600 mx-auto mb-4' />
      <h1 className='text-2xl font-bold'>Order Confirmed!</h1>
      {orderId && (
        <p className='text-muted-foreground mt-2'>
          Order number: <span className='font-semibold'>#{orderId}</span>
        </p>
      )}
      <p className='text-muted-foreground mt-2'>
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <p className='text-muted-foreground mt-1'>
        A confirmation email has been sent to your inbox.
      </p>

      <div className='mt-8 flex flex-col sm:flex-row gap-3 justify-center'>
        <Link href='/account/orders'>
          <Button variant='outline' className='gap-2'>
            <Package className='h-4 w-4' />
            View Orders
          </Button>
        </Link>
        <Link href='/products'>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
