'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Skeleton } from '@xplaza/ui';
import { Heart, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlistItems, removeFromWishlist, type WishlistItem } from '@/lib/queries';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@xplaza/utils';

export default function WishlistsPage() {
  const queryClient = useQueryClient();
  const { addItem } = useCart();

  const { data: response, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlistItems(),
  });

  const items: WishlistItem[] = response?.data ?? [];

  const removeMutation = useMutation({
    mutationFn: (productId: number) => removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  if (isLoading) {
    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='aspect-square' />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />
        <div className='text-center py-16'>
          <Heart className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
          <h1 className='text-2xl font-bold'>Your Wishlist is Empty</h1>
          <p className='text-muted-foreground mt-2'>
            Save items you love to your wishlist.
          </p>
          <Link href='/products'>
            <Button className='mt-6 gap-2'>
              Browse Products
              <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />
      <h1 className='text-2xl font-bold mb-6'>
        My Wishlist ({items.length} items)
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {items.map((item) => (
          <div key={item.id} className='border group'>
            <Link href={`/products/${item.productId}`}>
              <div className='relative aspect-square bg-muted overflow-hidden'>
                {item.productImage ? (
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    sizes='(min-width:1024px)25vw,(min-width:640px)33vw,50vw'
                    className='object-cover group-hover:scale-105 transition-transform'
                  />
                ) : (
                  <div className='h-full flex items-center justify-center text-xs text-muted-foreground'>
                    No Image
                  </div>
                )}
              </div>
            </Link>
            <div className='p-3'>
              <Link
                href={`/products/${item.productId}`}
                className='text-sm font-medium line-clamp-2 hover:text-primary'
              >
                {item.productName}
              </Link>
              <div className='flex items-center gap-2 mt-1'>
                <span className='font-semibold text-sm'>
                  {formatCurrency(item.sellingPrice, item.currency)}
                </span>
                {item.compareAtPrice && item.compareAtPrice > item.sellingPrice && (
                  <span className='text-xs text-muted-foreground line-through'>
                    {formatCurrency(item.compareAtPrice, item.currency)}
                  </span>
                )}
              </div>
              <div className='flex gap-2 mt-2'>
                <Button
                  size='sm'
                  className='flex-1 gap-1'
                  disabled={!item.inStock}
                  onClick={() => addItem({ productId: item.productId, quantity: 1 })}
                >
                  <ShoppingBag className='h-3.5 w-3.5' />
                  {item.inStock ? 'Add to bag' : 'Out of stock'}
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => removeMutation.mutate(item.productId)}
                >
                  <Trash2 className='h-3.5 w-3.5 text-destructive' />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
