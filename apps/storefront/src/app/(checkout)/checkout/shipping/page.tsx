'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { CheckoutStepper } from '@/components/checkout/checkout-stepper';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { useCheckout } from '@/hooks/use-checkout';

const CHECKOUT_STEPS = [
  { label: 'Shipping', href: '/checkout/shipping' },
  { label: 'Delivery', href: '/checkout/delivery' },
  { label: 'Payment', href: '/checkout/payment' },
  { label: 'Review', href: '/checkout/review' },
];

export default function CheckoutShippingPage() {
  const router = useRouter();
  const { setShippingAddress, isSavingAddress } = useCheckout();
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const address = {
      firstName: form.get('firstName') as string,
      lastName: form.get('lastName') as string,
      addressLine1: form.get('addressLine1') as string,
      addressLine2: (form.get('addressLine2') as string) || undefined,
      city: form.get('city') as string,
      state: form.get('state') as string,
      postalCode: form.get('postalCode') as string,
      country: form.get('country') as string,
      phone: (form.get('phone') as string) || undefined,
    };

    try {
      await setShippingAddress(address);
      router.push('/checkout/delivery');
    } catch {
      setError('Could not save address. Please try again.');
    }
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8'>
      <Breadcrumbs
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
          { label: 'Shipping' },
        ]}
      />
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={0} />

      <h1 className='text-xl font-bold mb-6'>Shipping Address</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              First Name
            </label>
            <Input name='firstName' required autoComplete='given-name' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Last Name
            </label>
            <Input name='lastName' required autoComplete='family-name' />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-1.5'>
            Address Line 1
          </label>
          <Input name='addressLine1' required autoComplete='address-line1' />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1.5'>
            Address Line 2 (Optional)
          </label>
          <Input name='addressLine2' autoComplete='address-line2' />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1.5'>City</label>
            <Input name='city' required autoComplete='address-level2' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              State / Province
            </label>
            <Input name='state' required autoComplete='address-level1' />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Postal Code
            </label>
            <Input name='postalCode' required autoComplete='postal-code' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>Country</label>
            <Input name='country' required autoComplete='country-name' />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-1.5'>
            Phone (Optional)
          </label>
          <Input name='phone' type='tel' autoComplete='tel' />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}

        <div className='flex justify-between pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.push('/cart')}
          >
            Back to Cart
          </Button>
          <Button type='submit' disabled={isSavingAddress}>
            {isSavingAddress ? 'Saving...' : 'Continue to Delivery'}
          </Button>
        </div>
      </form>
    </div>
  );
}
