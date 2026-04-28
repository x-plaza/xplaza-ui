'use client';

import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@xplaza/ui';
import { formatCurrency } from '@xplaza/utils';
import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import { useCart } from '@/hooks/use-cart';

export function CartDrawer() {
  const { isOpen, close } = useCartStore();
  const { cart, loading, itemCount, updateItem, removeItem } = useCart();

  const items = cart?.items ?? [];
  const subtotal = cart?.subtotal ?? 0;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/40 z-50'
        onClick={close}
        aria-hidden='true'
      />

      {/* Drawer */}
      <div className='fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b'>
          <h2 className='text-lg font-semibold flex items-center gap-2'>
            <ShoppingBag className='h-5 w-5' />
            Bag ({itemCount})
          </h2>
          <button
            onClick={close}
            className='p-2 hover:bg-muted'
            aria-label='Close bag'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Items */}
        <div className='flex-1 overflow-y-auto px-6 py-4'>
          {loading ? (
            <div className='text-center py-12 text-muted-foreground'>
              <p className='text-sm'>Loading bag...</p>
            </div>
          ) : items.length === 0 ? (
            <div className='text-center py-12 text-muted-foreground'>
              <ShoppingBag className='h-12 w-12 mx-auto mb-3 opacity-40' />
              <p className='font-bold text-foreground text-lg mb-1'>Your bag is empty</p>
              <p className='text-sm'>Items you add will appear here</p>
              <div className='mt-6 space-y-2'>
                <Link href='/login' onClick={close}>
                  <Button variant='outline' className='w-full'>
                    Sign in
                  </Button>
                </Link>
                <Link href='/products' onClick={close}>
                  <Button className='w-full'>
                    Get inspired
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <ul className='space-y-4'>
              {items.map((item) => (
                <li key={item.id} className='flex gap-4'>
                  <div className='w-20 h-28 bg-muted flex-shrink-0 overflow-hidden'>
                    {item.productImage ? (
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-xs text-muted-foreground'>
                        No img
                      </div>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-[13px] font-medium truncate'>{item.productName}</p>
                    {item.variantName && (
                      <p className='text-[12px] text-muted-foreground'>{item.variantName}</p>
                    )}
                    <p className='text-[13px] font-bold mt-1'>
                      {formatCurrency(item.unitPrice, item.currency)}
                    </p>
                    <div className='flex items-center gap-3 mt-2'>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem({ itemId: item.id, quantity: Number(e.target.value) })
                        }
                        className='h-8 px-2 border bg-background text-[13px]'
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeItem(item.id)}
                        className='p-1 ml-auto text-muted-foreground hover:text-destructive'
                        aria-label='Remove item'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className='border-t px-6 py-4 space-y-3'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span className='font-bold'>{formatCurrency(subtotal, cart?.currency)}</span>
            </div>
            <p className='text-[11px] text-muted-foreground'>
              Shipping costs and discounts calculated at checkout
            </p>
            <Link href='/checkout/shipping' onClick={close}>
              <Button className='w-full h-12'>Go to checkout</Button>
            </Link>
            <Link href='/cart' onClick={close}>
              <Button variant='outline' className='w-full mt-2'>
                View bag
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
