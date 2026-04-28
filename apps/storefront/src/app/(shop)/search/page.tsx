'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid';
import { Pagination } from '@/components/pagination';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Badge } from '@xplaza/ui';
import { Skeleton } from '@xplaza/ui';
import { X, SlidersHorizontal } from 'lucide-react';
import type { Product, PaginationMeta, AggregationBucket, SearchAggregations } from '@xplaza/types';
import { searchProducts } from '@/lib/queries';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page') ?? '0');
  const categoryId = searchParams.get('categoryId');
  const brandId = searchParams.get('brandId');
  const sort = searchParams.get('sort');

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [aggregations, setAggregations] = useState<SearchAggregations>({});
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const fetchResults = useCallback(async () => {
    if (!q) return;
    setLoading(true);
    try {
      const response = await searchProducts({
        q,
        page,
        size: 20,
        categoryId: categoryId ? Number(categoryId) : undefined,
        brandId: brandId ? Number(brandId) : undefined,
        sort: sort ?? undefined,
      });
      const data = response.data;
      setProducts(data?.hits ?? []);
      setTotal(data?.total ?? 0);
      setAggregations(data?.aggregations ?? {});
    } catch {
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [q, page, categoryId, brandId, sort]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  function updateParam(key: string, value: string | number | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    if (key !== 'page') params.set('page', '0');
    router.push(`${pathname}?${params.toString()}`);
  }

  const activeFilters: { key: string; label: string }[] = [];
  if (categoryId) {
    const bucket = aggregations.categories?.find((b) => b.key === categoryId);
    activeFilters.push({ key: 'categoryId', label: bucket?.label ?? `Category ${categoryId}` });
  }
  if (brandId) {
    const bucket = aggregations.brands?.find((b) => b.key === brandId);
    activeFilters.push({ key: 'brandId', label: bucket?.label ?? `Brand ${brandId}` });
  }

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs items={[{ label: 'Search' }, ...(q ? [{ label: q }] : [])]} />

      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>
            {q ? `Results for "${q}"` : 'Search'}
          </h1>
          {q && !loading && (
            <p className='text-sm text-muted-foreground mt-1'>
              {total} results found
            </p>
          )}
        </div>
        {q && (
          <Button
            variant='outline'
            size='sm'
            className='gap-2 lg:hidden'
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className='h-4 w-4' />
            Filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {activeFilters.map((filter) => (
            <Badge
              key={filter.key}
              variant='secondary'
              className='gap-1 cursor-pointer'
              onClick={() => updateParam(filter.key, null)}
            >
              {filter.label}
              <X className='h-3 w-3' />
            </Badge>
          ))}
          <Button
            variant='ghost'
            size='sm'
            className='h-6 text-xs'
            onClick={() => {
              const params = new URLSearchParams();
              if (q) params.set('q', q);
              router.push(`${pathname}?${params.toString()}`);
            }}
          >
            Clear all
          </Button>
        </div>
      )}

      {!q ? (
        <div className='text-center py-16'>
          <p className='text-muted-foreground'>
            Enter a search term above to find products.
          </p>
        </div>
      ) : (
        <div className='flex gap-8'>
          {/* Sidebar Filters (Desktop) */}
          <aside
            className={`w-60 flex-shrink-0 space-y-6 ${filtersOpen ? 'block' : 'hidden'} lg:block`}
          >
            {/* Category Facets */}
            {aggregations.categories && aggregations.categories.length > 0 && (
              <div>
                <h3 className='text-sm font-semibold mb-3'>Category</h3>
                <ul className='space-y-1.5'>
                  {aggregations.categories.map((bucket) => (
                    <li key={bucket.key}>
                      <button
                        className={`text-sm w-full text-left hover:text-primary transition-colors ${categoryId === bucket.key ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                        onClick={() =>
                          updateParam(
                            'categoryId',
                            categoryId === bucket.key ? null : bucket.key
                          )
                        }
                      >
                        {bucket.label} ({bucket.count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Brand Facets */}
            {aggregations.brands && aggregations.brands.length > 0 && (
              <div>
                <h3 className='text-sm font-semibold mb-3'>Brand</h3>
                <ul className='space-y-1.5'>
                  {aggregations.brands.map((bucket) => (
                    <li key={bucket.key}>
                      <button
                        className={`text-sm w-full text-left hover:text-primary transition-colors ${brandId === bucket.key ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                        onClick={() =>
                          updateParam(
                            'brandId',
                            brandId === bucket.key ? null : bucket.key
                          )
                        }
                      >
                        {bucket.label} ({bucket.count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Results */}
          <div className='flex-1'>
            {loading ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className='space-y-3'>
                    <Skeleton className='aspect-square' />
                    <Skeleton className='h-4 w-3/4' />
                    <Skeleton className='h-4 w-1/2' />
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
            {total > 20 && (
              <Pagination
                meta={{
                  page,
                  size: 20,
                  totalElements: total,
                  totalPages: Math.ceil(total / 20),
                  hasNext: (page + 1) * 20 < total,
                  hasPrevious: page > 0,
                }}
                onPageChange={(p) => updateParam('page', p)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
