'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Badge } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Skeleton } from '@xplaza/ui';
import { Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getOrders, type Order } from '@/lib/queries';
import { formatCurrency } from '@xplaza/utils';

export default function OrdersPage() {
  const { data: ordersResponse, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
  });

  const orders: Order[] = ordersResponse?.data ?? [];

  if (isLoading) {
    return (
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs
          items={[
            { label: 'My Account', href: '/account' },
            { label: 'Orders' },
          ]}
        />
        <h1 className='text-2xl font-bold mb-6'>Order History</h1>
        <div className='space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='h-20' />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs
          items={[
            { label: 'My Account', href: '/account' },
            { label: 'Orders' },
          ]}
        />
        <div className='text-center py-16'>
          <Package className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
          <h1 className='text-2xl font-bold'>No Orders Yet</h1>
          <p className='text-muted-foreground mt-2'>
            When you place an order, it will appear here.
          </p>
          <Link href='/products'>
            <Button className='mt-6 gap-2'>
              Start Shopping
              <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Orders' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Order History</h1>
      <div className='space-y-4'>
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className='block border p-4 hover:border-primary/50 transition-colors'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Order #{order.orderNumber}</p>
                <p className='text-sm text-muted-foreground'>
                  {new Date(order.createdAt).toLocaleDateString()} &middot;{' '}
                  {order.items.length} items
                </p>
              </div>
              <div className='text-right'>
                <Badge variant='secondary'>{order.status}</Badge>
                <p className='font-semibold mt-1'>
                  {formatCurrency(order.total, order.currency)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
