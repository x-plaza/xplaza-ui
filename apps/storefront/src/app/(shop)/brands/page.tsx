import { Suspense } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Skeleton } from '@xplaza/ui';
import { getBrands } from '@/lib/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brands',
  description: 'Browse all brands on X-Plaza.',
};

export const revalidate = 3600;

export default function BrandsPage() {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs items={[{ label: 'Brands' }]} />
      <h1 className='text-2xl font-bold mb-8'>All Brands</h1>
      <Suspense fallback={<BrandsSkeleton />}>
        <BrandsList />
      </Suspense>
    </div>
  );
}

async function BrandsList() {
  try {
    const response = await getBrands({ size: 100 });
    const brands = response.data ?? [];

    if (brands.length === 0) {
      return (
        <p className='text-center text-muted-foreground py-12'>
          No brands available.
        </p>
      );
    }

    // Group brands alphabetically
    const grouped: Record<string, typeof brands> = {};
    for (const brand of brands) {
      const letter = brand.name.charAt(0).toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(brand);
    }
    const letters = Object.keys(grouped).sort();

    return (
      <div className='pb-12'>
        {/* Letter quick-jump nav */}
        <div className='flex flex-wrap gap-1 mb-8 border-b pb-4'>
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#brand-${letter}`}
              className='w-8 h-8 flex items-center justify-center text-[13px] font-bold hover:bg-foreground hover:text-background transition-colors'
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Alphabetical sections */}
        <div className='space-y-8'>
          {letters.map((letter) => (
            <div key={letter} id={`brand-${letter}`}>
              <h2 className='text-lg font-bold border-b pb-2 mb-3'>{letter}</h2>
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-2'>
                {grouped[letter]?.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/products?brandId=${brand.id}`}
                    className='text-[13px] hover:underline underline-offset-4 py-0.5'
                  >
                    {brand.name}
                    {brand.productCount != null && (
                      <span className='text-muted-foreground ml-1'>({brand.productCount})</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch {
    return (
      <p className='text-center text-muted-foreground py-12'>
        Unable to load brands right now.
      </p>
    );
  }
}

function BrandsSkeleton() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className='h-32' />
      ))}
    </div>
  );
}
