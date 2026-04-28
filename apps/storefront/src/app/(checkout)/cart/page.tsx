'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Skeleton } from '@xplaza/ui';
import { useCart } from '@/hooks/use-cart';
import { useCheckout } from '@/hooks/use-checkout';
import { useAuth } from '@/hooks/use-auth';
import { formatCurrency } from '@xplaza/utils';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  Bookmark,
  ArrowRight,
  Tag,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    loading,
    cartId,
    updateItem,
    removeItem,
    applyCoupon,
    removeCoupon,
    saveForLater,
    moveToCart,
  } = useCart();

  const { start: startCheckout, isStarting } = useCheckout();
  const { user } = useAuth();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  async function handleApplyCoupon(e: React.FormEvent) {
    e.preventDefault();
    setCouponError('');
    try {
      await applyCoupon(couponCode);
      setCouponCode('');
    } catch (err) {
      setCouponError(
        err instanceof Error ? err.message : 'Invalid coupon'
      );
    }
  }

  if (loading) {
    return (
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <div className='space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='h-24' />
          ))}
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs items={[{ label: 'Bag' }]} />
        <div className='text-center py-16 max-w-md mx-auto'>
          <ShoppingBag className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
          <h1 className='text-2xl font-bold'>Your bag is empty</h1>
          <p className='text-muted-foreground mt-2'>
            Items you add will appear here. Sign in to see saved items.
          </p>
          <div className='mt-6 flex flex-col gap-2 max-w-xs mx-auto'>
            <Link href='/login'>
              <Button variant='outline' className='w-full'>Sign in</Button>
            </Link>
            <Link href='/products'>
              <Button className='w-full'>Get inspired</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs items={[{ label: 'Bag' }]} />
      <h1 className='text-2xl font-bold mb-6'>
        My bag ({cart.itemCount} items)
      </h1>

      <div className='grid lg:grid-cols-3 gap-8'>
        {/* Cart Items */}
        <div className='lg:col-span-2 space-y-4'>
          {cart.items.map((item) => (
            <div
              key={item.id}
              className='flex gap-4 border p-4'
            >
              <div className='relative h-32 w-28 flex-shrink-0 bg-muted overflow-hidden'>
                {item.productImage ? (
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    sizes='96px'
                    className='object-cover'
                  />
                ) : (
                  <div className='h-full flex items-center justify-center text-xs text-muted-foreground'>
                    No Image
                  </div>
                )}
              </div>

              <div className='flex-1 min-w-0'>
                <Link
                  href={`/products/${item.productId}`}
                  className='font-medium hover:text-primary transition-colors line-clamp-1'
                >
                  {item.productName}
                </Link>
                {item.variantName && (
                  <p className='text-sm text-muted-foreground'>
                    {item.variantName}
                  </p>
                )}
                <p className='font-semibold mt-1'>
                  {formatCurrency(item.totalPrice, item.currency)}
                </p>

                <div className='flex items-center gap-3 mt-2'>
                  {/* Quantity dropdown */}
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem({ itemId: item.id, quantity: Number(e.target.value) })
                    }
                    className='h-8 px-2 border bg-background text-sm'
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>

                  <button
                    className='text-sm text-muted-foreground hover:text-foreground flex items-center gap-1'
                    onClick={() => saveForLater(item.id)}
                  >
                    <Bookmark className='h-3.5 w-3.5' />
                    Save
                  </button>

                  <button
                    className='text-sm text-destructive hover:text-destructive/80 flex items-center gap-1'
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className='h-3.5 w-3.5' />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className='lg:col-span-1'>
          <div className='sticky top-24 border p-6 space-y-4'>
            <h2 className='font-semibold'>Order Summary</h2>

            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Subtotal</span>
                <span>{formatCurrency(cart.subtotal, cart.currency)}</span>
              </div>
              {cart.discount > 0 && (
                <div className='flex justify-between text-green-600'>
                  <span>Discount</span>
                  <span>-{formatCurrency(cart.discount, cart.currency)}</span>
                </div>
              )}
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className='border-t pt-3 flex justify-between font-semibold'>
              <span>Total</span>
              <span>{formatCurrency(cart.total, cart.currency)}</span>
            </div>

            {/* Coupon */}
            {cart.couponCode ? (
              <div className='flex items-center justify-between bg-green-50 p-3'>
                <div className='flex items-center gap-2 text-sm text-green-700'>
                  <Tag className='h-4 w-4' />
                  <span className='font-medium'>{cart.couponCode}</span>
                </div>
                <button
                  className='text-xs text-green-700 hover:text-green-900'
                  onClick={() => removeCoupon()}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className='flex gap-2'>
                <Input
                  placeholder='Coupon code'
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className='flex-1'
                />
                <Button
                  type='submit'
                  variant='outline'
                  size='sm'
                  disabled={!couponCode}
                >
                  Apply
                </Button>
              </form>
            )}
            {couponError && (
              <p className='text-xs text-destructive'>{couponError}</p>
            )}

            <Link href='/checkout/shipping'>
              <Button
                className='w-full gap-2'
                disabled={isStarting}
                onClick={async (e) => {
                  if (!user) {
                    // Not logged in — redirect to login with callback
                    e.preventDefault();
                    router.push('/login?callbackUrl=/cart');
                    return;
                  }
                  if (!cartId) return;
                  e.preventDefault();
                  setCheckoutError('');
                  try {
                    await startCheckout({ cartId });
                    router.push('/checkout/shipping');
                  } catch {
                    setCheckoutError('Could not start checkout. Please try again.');
                  }
                }}
              >
                {isStarting ? 'Starting checkout...' : 'Proceed to Checkout'}
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
            {checkoutError && (
              <p className='text-xs text-destructive'>{checkoutError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Saved for Later */}
      {cart.savedForLaterItems && cart.savedForLaterItems.length > 0 && (
        <div className='mt-12 border-t pt-8'>
          <h2 className='text-xl font-bold mb-4'>Saved for Later</h2>
          <div className='space-y-3'>
            {cart.savedForLaterItems.map((item) => (
              <div key={item.id} className='flex items-center gap-4 border p-4'>
                <div className='h-16 w-16 bg-muted flex-shrink-0' />
                <div className='flex-1'>
                  <p className='font-medium'>{item.productName}</p>
                  <p className='text-sm text-muted-foreground'>
                    {formatCurrency(item.unitPrice, item.currency)}
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => moveToCart(item.id)}
                >
                  Move to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
