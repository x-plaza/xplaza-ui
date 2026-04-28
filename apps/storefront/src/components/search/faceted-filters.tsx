'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Input } from '@xplaza/ui';
import { Badge } from '@xplaza/ui';
import { X } from 'lucide-react';
import { useCallback } from 'react';

interface FilterOption {
  key: string;
  docCount: number;
}

interface FacetedFiltersProps {
  brands?: FilterOption[];
  categories?: FilterOption[];
  priceRanges?: { min: number; max: number }[];
}

export function FacetedFilters({
  brands = [],
  categories = [],
}: FacetedFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedBrands = searchParams.get('brands')?.split(',').filter(Boolean) ?? [];
  const selectedCategories = searchParams.get('categories')?.split(',').filter(Boolean) ?? [];
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      params.delete('page'); // Reset pagination on filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  function toggleFilter(
    filterType: 'brands' | 'categories',
    value: string,
    selected: string[]
  ) {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    updateParams({ [filterType]: next.length > 0 ? next.join(',') : null });
  }

  function clearAll() {
    updateParams({
      brands: null,
      categories: null,
      minPrice: null,
      maxPrice: null,
    });
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    minPrice ||
    maxPrice;

  return (
    <aside className='w-full space-y-6'>
      {/* Active filters */}
      {hasActiveFilters && (
        <div>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold'>Active Filters</h3>
            <button
              onClick={clearAll}
              className='text-xs text-primary hover:underline'
            >
              Clear all
            </button>
          </div>
          <div className='flex flex-wrap gap-1.5'>
            {selectedBrands.map((b) => (
              <Badge
                key={`brand-${b}`}
                variant='secondary'
                className='cursor-pointer gap-1'
                onClick={() => toggleFilter('brands', b, selectedBrands)}
              >
                {b}
                <X className='h-3 w-3' />
              </Badge>
            ))}
            {selectedCategories.map((c) => (
              <Badge
                key={`cat-${c}`}
                variant='secondary'
                className='cursor-pointer gap-1'
                onClick={() => toggleFilter('categories', c, selectedCategories)}
              >
                {c}
                <X className='h-3 w-3' />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className='text-sm font-semibold mb-2'>Categories</h3>
          <ul className='space-y-1'>
            {categories.map((cat) => (
              <li key={cat.key}>
                <label className='flex items-center gap-2 text-sm cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={selectedCategories.includes(cat.key)}
                    onChange={() =>
                      toggleFilter('categories', cat.key, selectedCategories)
                    }
                    className='rounded border-input'
                  />
                  <span className='flex-1'>{cat.key}</span>
                  <span className='text-xs text-muted-foreground'>
                    ({cat.docCount})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <h3 className='text-sm font-semibold mb-2'>Brands</h3>
          <ul className='space-y-1'>
            {brands.map((brand) => (
              <li key={brand.key}>
                <label className='flex items-center gap-2 text-sm cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={selectedBrands.includes(brand.key)}
                    onChange={() =>
                      toggleFilter('brands', brand.key, selectedBrands)
                    }
                    className='rounded border-input'
                  />
                  <span className='flex-1'>{brand.key}</span>
                  <span className='text-xs text-muted-foreground'>
                    ({brand.docCount})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price range */}
      <div>
        <h3 className='text-sm font-semibold mb-2'>Price Range</h3>
        <div className='flex items-center gap-2'>
          <Input
            type='number'
            placeholder='Min'
            value={minPrice}
            onChange={(e) => updateParams({ minPrice: e.target.value || null })}
            className='h-9 text-sm'
          />
          <span className='text-muted-foreground'>—</span>
          <Input
            type='number'
            placeholder='Max'
            value={maxPrice}
            onChange={(e) => updateParams({ maxPrice: e.target.value || null })}
            className='h-9 text-sm'
          />
        </div>
      </div>
    </aside>
  );
}
