import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { cn, formatCurrency } from '@xplaza/utils';
import type { Product } from '@xplaza/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const thumbnail = product.images?.find((img) => img.isThumbnail) ?? product.images?.[0];
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.sellingPrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.sellingPrice) /
          product.compareAtPrice!) *
          100
      )
    : 0;

  return (
    <article className={cn('group', className)}>
      <Link href={`/products/${product.id}`} className='block'>
        <div className='relative aspect-[3/4] overflow-hidden bg-secondary'>
          {thumbnail ? (
            <Image
              src={thumbnail.url}
              alt={thumbnail.altText ?? product.name}
              fill
              sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full items-center justify-center text-muted-foreground/30'>
              <ShoppingBag className='h-12 w-12' />
            </div>
          )}

          {/* Wishlist */}
          <button className='absolute top-2 right-2 h-8 w-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary'>
            <Heart className='h-4 w-4' />
          </button>

          {/* Discount badge */}
          {hasDiscount && (
            <span className='absolute top-2 left-2 bg-accent text-accent-foreground text-[11px] font-bold px-2 py-0.5'>
              -{discountPercent}%
            </span>
          )}

          {!product.inStock && (
            <div className='absolute inset-0 bg-background/60 flex items-center justify-center'>
              <span className='text-xs font-bold uppercase tracking-wide bg-background px-3 py-1'>Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className='pt-3'>
        {product.brandName && (
          <p className='text-[11px] font-bold uppercase tracking-wide text-muted-foreground'>
            {product.brandName}
          </p>
        )}
        <Link href={`/products/${product.id}`}>
          <h3 className='text-[13px] leading-snug line-clamp-2 text-foreground mt-0.5'>
            {product.name}
          </h3>
        </Link>

        <div className='mt-1.5 flex items-baseline gap-2'>
          <span className='text-[13px] font-bold text-foreground'>
            {formatCurrency(product.sellingPrice, product.currency)}
          </span>
          {hasDiscount && (
            <span className='text-[13px] text-muted-foreground line-through'>
              {formatCurrency(product.compareAtPrice!, product.currency)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
