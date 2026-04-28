'use client';

import { useState } from 'react';
import { ShoppingBag, Heart, Loader2 } from 'lucide-react';
import { Button } from '@xplaza/ui';
import { useCart } from '@/hooks/use-cart';
import { useCartStore } from '@/stores/cart-store';

interface Variant {
  id: number;
  name: string;
  sku?: string;
  price?: number;
  compareAtPrice?: number;
  quantity?: number;
  inStock?: boolean;
  attributes?: Array<{ name: string; value: string }>;
}

interface AddToCartProps {
  productId: number;
  productName: string;
  inStock: boolean;
  variants?: Variant[];
  sellingPrice: number;
  currency: string;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export function AddToCart({
  productId,
  inStock,
  variants,
  sellingPrice: _sellingPrice,
  currency: _currency,
}: AddToCartProps) {
  const { addItem, isAdding } = useCart();
  const { open } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAddToCart() {
    setError(null);

    // If there are variants, require selection
    if (variants && variants.length > 0 && !selectedVariant) {
      setError('Please select a variant');
      return;
    }

    try {
      await addItem({
        productId,
        quantity: 1,
        variantId: selectedVariant ?? undefined,
      });
      open(); // Open cart drawer
    } catch {
      setError('Could not add to bag. Please try again.');
    }
  }

  return (
    <>
      {/* Variant buttons */}
      {variants && variants.length > 0 && (
        <div className='mt-6'>
          <p className='text-[13px] font-bold mb-2'>Variants</p>
          <div className='flex flex-wrap gap-2'>
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={`h-10 min-w-[64px] px-3 border-2 transition-colors text-[13px] ${
                  selectedVariant === variant.id
                    ? 'border-foreground font-bold'
                    : 'border-border hover:border-foreground'
                } ${variant.inStock === false ? 'opacity-40 line-through' : ''}`}
                disabled={variant.inStock === false}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {variants && variants.length > 0 && (
        <div className='mt-6'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-[13px] font-bold'>Size</p>
            <button className='text-[13px] underline underline-offset-4 text-muted-foreground hover:text-foreground'>
              Size guide
            </button>
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-10 border text-[13px] font-semibold transition-colors ${
                  selectedSize === size
                    ? 'border-foreground bg-foreground text-background'
                    : 'hover:border-foreground'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className='text-[13px] text-destructive mt-3'>{error}</p>
      )}

      {/* Add to bag + wishlist */}
      <div className='mt-6 flex gap-3'>
        <Button
          size='lg'
          className='flex-1 gap-2 h-12'
          disabled={!inStock || isAdding}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <Loader2 className='h-5 w-5 animate-spin' />
          ) : (
            <ShoppingBag className='h-5 w-5' />
          )}
          {!inStock ? 'Out of stock' : isAdding ? 'Adding...' : 'Add to bag'}
        </Button>
        <Button variant='outline' size='lg' className='h-12 w-12 p-0'>
          <Heart className='h-5 w-5' />
        </Button>
      </div>
    </>
  );
}
