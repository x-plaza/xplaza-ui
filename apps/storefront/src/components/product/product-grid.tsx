import type { Product } from '@xplaza/types';
import { ProductCard } from './product-card';
import { cn } from '@xplaza/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground'>No products found.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6',
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
