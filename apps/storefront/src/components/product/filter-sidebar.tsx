'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import type { Category, Brand } from '@xplaza/types';

interface FilterGroup {
  key: string;
  label: string;
  type: 'categories' | 'brands' | 'price' | 'custom';
}

interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string | undefined) => void;
}

const PRICE_RANGES = [
  { label: 'Under $25', min: '0', max: '25' },
  { label: '$25 - $50', min: '25', max: '50' },
  { label: '$50 - $100', min: '50', max: '100' },
  { label: '$100 - $200', min: '100', max: '200' },
  { label: 'Over $200', min: '200', max: '' },
];

const GENDER_OPTIONS = [
  { label: 'Women', value: 'women' },
  { label: 'Men', value: 'men' },
  { label: 'Kids', value: 'kids' },
  { label: 'Unisex', value: 'unisex' },
];

function FilterSection({
  label,
  children,
  defaultOpen = true,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className='border-b pb-4 mb-4'>
      <button
        className='flex items-center justify-between w-full text-left py-1'
        onClick={() => setOpen(!open)}
      >
        <span className='text-[13px] font-bold'>{label}</span>
        {open ? (
          <ChevronUp className='h-4 w-4 text-muted-foreground' />
        ) : (
          <ChevronDown className='h-4 w-4 text-muted-foreground' />
        )}
      </button>
      {open && <div className='mt-3'>{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  categories,
  brands,
  activeFilters,
  onFilterChange,
}: FilterSidebarProps) {
  return (
    <aside className='w-full'>
      {/* Active filter chips */}
      {Object.keys(activeFilters).length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4 pb-4 border-b'>
          {Object.entries(activeFilters).map(([key, value]) => (
            <button
              key={key}
              className='inline-flex items-center gap-1 text-[12px] px-2.5 py-1 border bg-secondary hover:bg-muted transition-colors'
              onClick={() => onFilterChange(key, undefined)}
            >
              {value}
              <X className='h-3 w-3' />
            </button>
          ))}
          <button
            className='text-[12px] underline text-muted-foreground hover:text-foreground'
            onClick={() => {
              Object.keys(activeFilters).forEach((k) =>
                onFilterChange(k, undefined)
              );
            }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Category filter */}
      <FilterSection label='Category'>
        <ul className='space-y-1.5'>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`text-[13px] hover:underline text-left w-full ${
                  activeFilters.categoryId === String(cat.id)
                    ? 'font-bold text-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() =>
                  onFilterChange(
                    'categoryId',
                    activeFilters.categoryId === String(cat.id)
                      ? undefined
                      : String(cat.id)
                  )
                }
              >
                {cat.name}
                {cat.productCount != null && (
                  <span className='text-[11px] ml-1'>({cat.productCount})</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Brand filter */}
      <FilterSection label='Brand'>
        <ul className='space-y-1.5'>
          {brands.map((brand) => (
            <li key={brand.id}>
              <button
                className={`text-[13px] hover:underline text-left w-full ${
                  activeFilters.brandId === String(brand.id)
                    ? 'font-bold text-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() =>
                  onFilterChange(
                    'brandId',
                    activeFilters.brandId === String(brand.id)
                      ? undefined
                      : String(brand.id)
                  )
                }
              >
                {brand.name}
                {brand.productCount != null && (
                  <span className='text-[11px] ml-1'>
                    ({brand.productCount})
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Price filter */}
      <FilterSection label='Price'>
        <ul className='space-y-1.5'>
          {PRICE_RANGES.map((range) => {
            const value = `${range.min}-${range.max}`;
            const isActive =
              activeFilters.minPrice === range.min &&
              activeFilters.maxPrice === (range.max || undefined);
            return (
              <li key={value}>
                <button
                  className={`text-[13px] hover:underline text-left w-full ${
                    isActive
                      ? 'font-bold text-foreground'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => {
                    if (isActive) {
                      onFilterChange('minPrice', undefined);
                      onFilterChange('maxPrice', undefined);
                    } else {
                      onFilterChange('minPrice', range.min);
                      onFilterChange('maxPrice', range.max || undefined);
                    }
                  }}
                >
                  {range.label}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterSection>

      {/* Gender filter */}
      <FilterSection label='Gender'>
        <ul className='space-y-1.5'>
          {GENDER_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                className={`text-[13px] hover:underline text-left w-full ${
                  activeFilters.gender === option.value
                    ? 'font-bold text-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() =>
                  onFilterChange(
                    'gender',
                    activeFilters.gender === option.value
                      ? undefined
                      : option.value
                  )
                }
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>
    </aside>
  );
}
