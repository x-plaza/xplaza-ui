'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Badge } from '@xplaza/ui';
import { Skeleton } from '@xplaza/ui';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '@/lib/queries';
import { formatCurrency } from '@xplaza/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: orderResponse, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(Number(id)),
    enabled: !!id,
  });

  const order = orderResponse?.data;

  if (isLoading) {
    return (
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs
          items={[
            { label: 'My Account', href: '/account' },
            { label: 'Orders', href: '/account/orders' },
            { label: `Order #${id}` },
          ]}
        />
        <div className='space-y-4'>
          <Skeleton className='h-10 w-48' />
          <Skeleton className='h-40' />
          <Skeleton className='h-40' />
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Orders', href: '/account/orders' },
          { label: `Order #${order?.orderNumber ?? id}` },
        ]}
      />

      <div className='flex items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold'>Order #{order?.orderNumber ?? id}</h1>
        <Badge variant='secondary'>{order?.status ?? 'Unknown'}</Badge>
      </div>

      {/* Order Timeline */}
      <section className='border p-6 mb-6'>
        <h2 className='font-semibold mb-4'>Order Timeline</h2>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <div className='h-3 w-3 rounded-full bg-primary' />
          <span>Order placed</span>
          <span className='ml-auto'>
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : '—'}
          </span>
        </div>
      </section>

      {/* Items */}
      <section className='border p-6 mb-6'>
        <h2 className='font-semibold mb-4'>Items</h2>
        <div className='divide-y'>
          {order?.items.map((item) => (
            <div key={item.id} className='flex items-center gap-4 py-3'>
              <div className='relative h-16 w-16 flex-shrink-0 bg-muted overflow-hidden'>
                {item.productImage ? (
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    sizes='64px'
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
                  className='font-medium hover:text-primary line-clamp-1'
                >
                  {item.productName}
                </Link>
                {item.variantName && (
                  <p className='text-sm text-muted-foreground'>{item.variantName}</p>
                )}
                <p className='text-sm text-muted-foreground'>Qty: {item.quantity}</p>
              </div>
              <span className='font-semibold'>
                {formatCurrency(item.totalPrice, order.currency)}
              </span>
            </div>
          )) ?? (
            <p className='text-sm text-muted-foreground'>No items</p>
          )}
        </div>
      </section>

      {/* Shipping & Payment */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <section className='border p-6'>
          <h2 className='font-semibold mb-4'>Shipping Address</h2>
          {order?.shippingAddress ? (
            <div className='text-sm space-y-1'>
              <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p className='text-muted-foreground'>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && (
                <p className='text-muted-foreground'>{order.shippingAddress.addressLine2}</p>
              )}
              <p className='text-muted-foreground'>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}
              </p>
              <p className='text-muted-foreground'>{order.shippingAddress.country}</p>
            </div>
          ) : (
            <p className='text-sm text-muted-foreground'>No address on file</p>
          )}
        </section>
        <section className='border p-6'>
          <h2 className='font-semibold mb-4'>Payment Summary</h2>
          {order ? (
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Subtotal</span>
                <span>{formatCurrency(order.subtotal, order.currency)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Shipping</span>
                <span>{formatCurrency(order.shippingCost, order.currency)}</span>
              </div>
              {order.discount > 0 && (
                <div className='flex justify-between text-green-600'>
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discount, order.currency)}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Tax</span>
                  <span>{formatCurrency(order.tax, order.currency)}</span>
                </div>
              )}
              <div className='border-t pt-2 flex justify-between font-semibold'>
                <span>Total</span>
                <span>{formatCurrency(order.total, order.currency)}</span>
              </div>
            </div>
          ) : (
            <p className='text-sm text-muted-foreground'>No payment details</p>
          )}
        </section>
      </div>
    </div>
  );
}
