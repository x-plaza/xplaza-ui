'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { CheckoutStepper } from '@/components/checkout/checkout-stepper';
import { Button } from '@xplaza/ui';
import { CreditCard, Banknote } from 'lucide-react';
import { cn } from '@xplaza/utils';
import { useCheckout } from '@/hooks/use-checkout';

const CHECKOUT_STEPS = [
  { label: 'Shipping', href: '/checkout/shipping' },
  { label: 'Delivery', href: '/checkout/delivery' },
  { label: 'Payment', href: '/checkout/payment' },
  { label: 'Review', href: '/checkout/review' },
];

const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Credit / Debit Card',
    description: 'Pay securely with Stripe',
    icon: CreditCard,
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: Banknote,
  },
];

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const { setPaymentMethod, isSavingPayment } = useCheckout();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [error, setError] = useState('');

  async function handleContinue() {
    setError('');
    try {
      await setPaymentMethod(selectedMethod);
      router.push('/checkout/review');
    } catch {
      setError('Could not save payment method. Please try again.');
    }
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8'>
      <Breadcrumbs
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
          { label: 'Payment' },
        ]}
      />
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={2} />

      <h1 className='text-xl font-bold mb-6'>Payment Method</h1>

      <div className='space-y-3'>
        {PAYMENT_METHODS.map((method) => {
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
              <div>
                <p className='font-medium'>{method.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {method.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {selectedMethod === 'card' && (
        <div className='mt-6 border p-6'>
          <p className='text-sm text-muted-foreground'>
            Stripe card input will be rendered here when the Stripe publishable
            key is configured. Card details are handled securely by Stripe
            Elements and never touch our servers.
          </p>
        </div>
      )}

      {error && <p className='text-sm text-destructive mt-4'>{error}</p>}

      <div className='flex justify-between pt-8'>
        <Button
          variant='outline'
          onClick={() => router.push('/checkout/delivery')}
        >
          Back
        </Button>
        <Button onClick={handleContinue} disabled={isSavingPayment}>
          {isSavingPayment ? 'Saving...' : 'Review Order'}
        </Button>
      </div>
    </div>
  );
}
