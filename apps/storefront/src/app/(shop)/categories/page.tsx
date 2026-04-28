import { Suspense } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Skeleton } from '@xplaza/ui';
import { getCategories } from '@/lib/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all product categories on X-Plaza.',
};

export const revalidate = 3600;

export default function CategoriesPage() {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs items={[{ label: 'Categories' }]} />
      <h1 className='text-2xl font-bold mb-8'>All Categories</h1>
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesList />
      </Suspense>
    </div>
  );
}

async function CategoriesList() {
  try {
    const response = await getCategories({ size: 100 });
    const categories = response.data ?? [];

    if (categories.length === 0) {
      return (
        <p className='text-center text-muted-foreground py-12'>
          No categories available.
        </p>
      );
    }

    // Separate parent categories from children
    const parents = categories.filter((c) => !c.parentId);
    const childMap: Record<string, typeof categories> = {};
    for (const c of categories) {
      if (c.parentId) {
        if (!childMap[c.parentId]) childMap[c.parentId] = [];
        childMap[c.parentId]!.push(c);
      }
    }

    return (
      <div className='pb-12 space-y-8'>
        {parents.map((parent) => (
          <div key={parent.id}>
            <h2 className='text-lg font-bold border-b pb-2 mb-3'>
              <Link
                href={`/products?categoryId=${parent.id}`}
                className='hover:underline underline-offset-4'
              >
                {parent.name}
                {parent.productCount != null && (
                  <span className='text-muted-foreground text-sm font-normal ml-2'>({parent.productCount})</span>
                )}
              </Link>
            </h2>
            {childMap[parent.id] && childMap[parent.id]!.length > 0 && (
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-2'>
                {childMap[parent.id]!.map((child) => (
                  <Link
                    key={child.id}
                    href={`/products?categoryId=${child.id}`}
                    className='text-[13px] hover:underline underline-offset-4 py-0.5'
                  >
                    {child.name}
                    {child.productCount != null && (
                      <span className='text-muted-foreground ml-1'>({child.productCount})</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* Ungrouped categories (no parent) that have children of their own — already shown */}
        {/* Leaf categories with no parent — show as flat list if any remain */}
      </div>
    );
  } catch {
    return (
      <p className='text-center text-muted-foreground py-12'>
        Unable to load categories right now.
      </p>
    );
  }
}

function CategoriesSkeleton() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className='h-32' />
      ))}
    </div>
  );
}
