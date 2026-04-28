'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid';
import { FilterSidebar } from '@/components/product/filter-sidebar';
import { Pagination } from '@/components/pagination';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Skeleton } from '@xplaza/ui';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import type { Product, PaginationMeta, Category, Brand } from '@xplaza/types';
import { getProducts, getCategories, getBrands } from '@/lib/queries';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'createdAt', direction: 'desc' as const },
  { label: 'Price: Low to High', value: 'sellingPrice', direction: 'asc' as const },
  { label: 'Price: High to Low', value: 'sellingPrice', direction: 'desc' as const },
  { label: 'Name: A-Z', value: 'name', direction: 'asc' as const },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const page = Number(searchParams.get('page') ?? '0');
  const categoryId = searchParams.get('categoryId');
  const brandId = searchParams.get('brandId');
  const sort = searchParams.get('sort') ?? 'createdAt';
  const direction = (searchParams.get('direction') ?? 'desc') as 'asc' | 'desc';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const gender = searchParams.get('gender');

  // Fetch filter data
  useEffect(() => {
    getCategories({ size: 30 })
      .then((r) => setCategories(r.data ?? []))
      .catch(() => {});
    getBrands({ size: 30 })
      .then((r) => setBrands(r.data ?? []))
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProducts({
        page,
        size: 20,
        categoryId: categoryId ? Number(categoryId) : undefined,
        brandId: brandId ? Number(brandId) : undefined,
        sort,
        direction,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        gender: gender ?? undefined,
      });
      setProducts(response.data ?? []);
      setPagination(response.meta?.pagination ?? null);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, categoryId, brandId, sort, direction, minPrice, maxPrice, gender]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function updateParam(key: string, value: string | number | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === undefined) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    if (key !== 'page') params.set('page', '0');
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePageChange(newPage: number) {
    updateParam('page', newPage);
  }

  function handleSort(sortValue: string, dir: 'asc' | 'desc') {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortValue);
    params.set('direction', dir);
    params.set('page', '0');
    router.push(`${pathname}?${params.toString()}`);
    setSortOpen(false);
  }

  function handleFilterChange(key: string, value: string | undefined) {
    updateParam(key, value);
  }

  // Build active filters map for display
  const activeFilters: Record<string, string> = {};
  if (categoryId) {
    const cat = categories.find((c) => String(c.id) === categoryId);
    activeFilters.categoryId = cat?.name ?? `Category ${categoryId}`;
  }
  if (brandId) {
    const br = brands.find((b) => String(b.id) === brandId);
    activeFilters.brandId = br?.name ?? `Brand ${brandId}`;
  }
  if (minPrice) activeFilters.minPrice = `From $${minPrice}`;
  if (maxPrice) activeFilters.maxPrice = `To $${maxPrice}`;
  if (gender) {
    activeFilters.gender = gender.charAt(0).toUpperCase() + gender.slice(1);
  }

  const currentSort = SORT_OPTIONS.find(
    (o) => o.value === sort && o.direction === direction
  );

  return (
    <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10'>
      <Breadcrumbs items={[{ label: 'Products' }]} />

      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>All Products</h1>
          {pagination && (
            <p className='text-sm text-muted-foreground mt-1'>
              {pagination.totalElements} products found
            </p>
          )}
        </div>

        <div className='flex items-center gap-2'>
          {/* Mobile filter toggle */}
          <Button
            variant='outline'
            size='sm'
            className='lg:hidden gap-2'
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <SlidersHorizontal className='h-4 w-4' />
            Filter
          </Button>

          <div className='relative'>
            <Button
              variant='outline'
              size='sm'
              className='gap-2'
              onClick={() => setSortOpen(!sortOpen)}
            >
              <ArrowUpDown className='h-4 w-4' />
              {currentSort?.label ?? 'Sort'}
            </Button>
            {sortOpen && (
              <div className='absolute right-0 top-full mt-1 w-48 border bg-background z-10'>
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={`${option.value}-${option.direction}`}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                      option.value === sort && option.direction === direction
                        ? 'font-bold'
                        : ''
                    }`}
                    onClick={() => handleSort(option.value, option.direction)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active filter chips on mobile */}
      {Object.keys(activeFilters).length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4 lg:hidden'>
          {Object.entries(activeFilters).map(([key, value]) => (
            <button
              key={key}
              className='inline-flex items-center gap-1 text-[12px] px-2.5 py-1 border bg-secondary'
              onClick={() => handleFilterChange(key, undefined)}
            >
              {value}
              <X className='h-3 w-3' />
            </button>
          ))}
        </div>
      )}

      <div className='flex gap-8'>
        {/* Desktop filter sidebar */}
        <div className='hidden lg:block w-56 flex-shrink-0'>
          <FilterSidebar
            categories={categories}
            brands={brands}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className='fixed inset-0 z-50 lg:hidden'>
            <div
              className='absolute inset-0 bg-black/40'
              onClick={() => setFilterOpen(false)}
            />
            <div className='absolute inset-y-0 left-0 w-72 bg-background p-6 overflow-y-auto'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='font-bold'>Filters</h3>
                <button
                  onClick={() => setFilterOpen(false)}
                  className='p-1'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
              <FilterSidebar
                categories={categories}
                brands={brands}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className='flex-1 min-w-0'>
          {loading ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6'>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className='space-y-3'>
                  <Skeleton className='aspect-[3/4]' />
                  <Skeleton className='h-3 w-3/4' />
                  <Skeleton className='h-3 w-1/2' />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid
              products={products}
              className='grid-cols-2 sm:grid-cols-3'
            />
          )}

          {pagination && (
            <Pagination meta={pagination} onPageChange={handlePageChange} />
          )}
        </div>
      </div>
    </div>
  );
}
