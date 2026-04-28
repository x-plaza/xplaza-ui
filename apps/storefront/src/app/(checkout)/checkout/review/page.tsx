'use client';

import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { CheckoutStepper } from '@/components/checkout/checkout-stepper';
import { Button } from '@xplaza/ui';
import { useCart } from '@/hooks/use-cart';
import { useCheckout } from '@/hooks/use-checkout';
import { formatCurrency, generateIdempotencyKey } from '@xplaza/utils';
import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const CHECKOUT_STEPS = [
  { label: 'Shipping', href: '/checkout/shipping' },
  { label: 'Delivery', href: '/checkout/delivery' },
  { label: 'Payment', href: '/checkout/payment' },
  { label: 'Review', href: '/checkout/review' },
];

export default function CheckoutReviewPage() {
  const router = useRouter();
  const { cart } = useCart();
  const { complete, isCompleting } = useCheckout();
  const [error, setError] = useState('');

  async function handlePlaceOrder() {
    setError('');
    try {
      const idempotencyKey = generateIdempotencyKey();
      const result = await complete(idempotencyKey);
      const orderId = (result as { data?: { orderId: number } })?.data?.orderId;
      router.push(`/checkout/complete${orderId ? `?orderId=${orderId}` : ''}`);
    } catch {
      setError('Could not place order. Please try again.');
    }
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8'>
      <Breadcrumbs
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
          { label: 'Review' },
        ]}
      />
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={3} />

      <h1 className='text-xl font-bold mb-6'>Review Your Order</h1>

      {/* Order Items */}
      <div className='border divide-y'>
        {cart?.items.map((item) => (
          <div key={item.id} className='flex items-center gap-4 p-4'>
            <div className='h-16 w-16 bg-muted flex-shrink-0' />
            <div className='flex-1 min-w-0'>
              <p className='font-medium line-clamp-1'>{item.productName}</p>
              <p className='text-sm text-muted-foreground'>
                Qty: {item.quantity}
              </p>
            </div>
            <span className='font-semibold'>
              {formatCurrency(item.totalPrice, item.currency)}
            </span>
          </div>
        )) ?? (
          <div className='p-4 text-center text-muted-foreground'>
            No items in cart
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className='border mt-6 p-6 space-y-3'>
        <h2 className='font-semibold'>Order Summary</h2>
        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Subtotal</span>
            <span>
              {formatCurrency(cart?.subtotal ?? 0, cart?.currency ?? 'USD')}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Shipping</span>
            <span>Free</span>
          </div>
          {cart && cart.discount > 0 && (
            <div className='flex justify-between text-green-600'>
              <span>Discount</span>
              <span>-{formatCurrency(cart.discount, cart.currency)}</span>
            </div>
          )}
        </div>
        <div className='border-t pt-3 flex justify-between font-bold text-lg'>
          <span>Total</span>
          <span>
            {formatCurrency(cart?.total ?? 0, cart?.currency ?? 'USD')}
          </span>
        </div>
      </div>

      <div className='flex items-center gap-2 text-sm text-muted-foreground mt-4'>
        <ShieldCheck className='h-4 w-4' />
        <span>Your payment is secured and encrypted</span>
      </div>

      {error && <p className='text-sm text-destructive mt-4'>{error}</p>}

      <div className='flex justify-between pt-6'>
        <Button
          variant='outline'
          onClick={() => router.push('/checkout/payment')}
        >
          Back
        </Button>
        <Button
          size='lg'
          onClick={handlePlaceOrder}
          disabled={isCompleting || !cart?.items.length}
        >
          {isCompleting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
}
