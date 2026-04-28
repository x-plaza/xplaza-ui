'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { CheckoutStepper } from '@/components/checkout/checkout-stepper';
import { Button } from '@xplaza/ui';
import { Truck, Clock } from 'lucide-react';
import { cn } from '@xplaza/utils';
import { useCheckout } from '@/hooks/use-checkout';

const CHECKOUT_STEPS = [
  { label: 'Shipping', href: '/checkout/shipping' },
  { label: 'Delivery', href: '/checkout/delivery' },
  { label: 'Payment', href: '/checkout/payment' },
  { label: 'Review', href: '/checkout/review' },
];

const SHIPPING_METHODS = [
  {
    id: 1,
    name: 'Standard Shipping',
    description: '5-7 business days',
    cost: 0,
    icon: Truck,
  },
  {
    id: 2,
    name: 'Express Shipping',
    description: '2-3 business days',
    cost: 9.99,
    icon: Clock,
  },
];

export default function CheckoutDeliveryPage() {
  const router = useRouter();
  const { setShippingMethod, isSavingMethod } = useCheckout();
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [error, setError] = useState('');

  async function handleContinue() {
    setError('');
    try {
      await setShippingMethod(selectedMethod);
      router.push('/checkout/payment');
    } catch {
      setError('Could not save delivery method. Please try again.');
    }
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8'>
      <Breadcrumbs
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
          { label: 'Delivery' },
        ]}
      />
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={1} />

      <h1 className='text-xl font-bold mb-6'>Delivery Method</h1>

      <div className='space-y-3'>
        {SHIPPING_METHODS.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              className={cn(
                'w-full flex items-center gap-4 border p-4 text-left transition-colors',
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-muted-foreground/50'
              )}
              onClick={() => setSelectedMethod(method.id)}
            >
              <Icon className='h-6 w-6 text-primary flex-shrink-0' />
              <div className='flex-1'>
                <p className='font-medium'>{method.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {method.description}
                </p>
              </div>
              <span className='font-semibold'>
                {method.cost === 0 ? 'Free' : `$${method.cost.toFixed(2)}`}
              </span>
            </button>
          );
        })}
      </div>

      {error && <p className='text-sm text-destructive mt-4'>{error}</p>}

      <div className='flex justify-between pt-8'>
        <Button
          variant='outline'
          onClick={() => router.push('/checkout/shipping')}
        >
          Back
        </Button>
        <Button onClick={handleContinue} disabled={isSavingMethod}>
          {isSavingMethod ? 'Saving...' : 'Continue to Payment'}
        </Button>
      </div>
    </div>
  );
}
