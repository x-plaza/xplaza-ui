import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@xplaza/ui';
import { ProductCarousel } from '@/components/product/product-carousel';
import { HeroCarousel } from '@/components/layout/hero-carousel';
import { Skeleton } from '@xplaza/ui';
import { getProducts, getCategories, getBrands } from '@/lib/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'X-Plaza | Multi-Vendor Marketplace',
};

export const revalidate = 60;

const GENDER_CARDS = [
  {
    label: 'Women',
    href: '/products?gender=women',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&crop=center',
  },
  {
    label: 'Men',
    href: '/products?gender=men',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=center',
  },
  {
    label: 'Kids',
    href: '/products?gender=kids',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=800&fit=crop&crop=center',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Promise strip */}
      <section className='border-b'>
        <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-4'>
          <div className='flex items-center justify-center gap-8 text-center flex-wrap'>
            <span className='text-[13px] text-muted-foreground'>
              Free delivery* on orders over $50
            </span>
            <span className='hidden sm:inline text-border'>|</span>
            <span className='text-[13px] text-muted-foreground'>
              Free 30-day returns
            </span>
            <span className='hidden sm:inline text-border'>|</span>
            <span className='text-[13px] text-muted-foreground'>
              Flexible payment options
            </span>
          </div>
        </div>
      </section>

      {/* Gender cards — full-bleed images with text overlay */}
      <section className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 lg:py-16'>
        <h2 className='text-center text-lg font-bold mb-8'>
          Where would you like to start?
        </h2>
        <div className='grid grid-cols-3 gap-4'>
          {GENDER_CARDS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='group relative aspect-[3/4] overflow-hidden'
            >
              <img
                src={item.image}
                alt={item.label}
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-6'>
                <span className='text-white text-sm font-bold uppercase tracking-wide border-b-2 border-white pb-0.5 group-hover:border-accent transition-colors'>
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending — horizontal scrollable carousel */}
      <section className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 lg:py-16'>
        <div className='flex items-baseline justify-between mb-6'>
          <h2 className='text-xl font-bold'>Trending now</h2>
          <Link
            href='/products'
            className='text-[13px] font-semibold underline underline-offset-4 hover:no-underline'
          >
            View all
          </Link>
        </div>
        <Suspense fallback={<CarouselSkeleton />}>
          <TrendingProducts />
        </Suspense>
      </section>

      {/* Top Brands — text link section */}
      <section className='border-t border-b'>
        <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10'>
          <h2 className='text-lg font-bold mb-6 text-center'>Top Brands</h2>
          <Suspense
            fallback={
              <div className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className='h-4 w-20' />
                ))}
              </div>
            }
          >
            <TopBrands />
          </Suspense>
        </div>
      </section>

      {/* New Arrivals — carousel */}
      <section className='bg-secondary'>
        <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 lg:py-16'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='text-xl font-bold'>New in</h2>
            <Link
              href='/products?sort=createdAt&direction=desc'
              className='text-[13px] font-semibold underline underline-offset-4 hover:no-underline'
            >
              View all
            </Link>
          </div>
          <Suspense fallback={<CarouselSkeleton />}>
            <NewArrivals />
          </Suspense>
        </div>
      </section>

      {/* Top Categories — dense text-link grid */}
      <section className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 lg:py-16'>
        <div className='flex items-baseline justify-between mb-6'>
          <h2 className='text-xl font-bold'>Shop by category</h2>
          <Link
            href='/categories'
            className='text-[13px] font-semibold underline underline-offset-4 hover:no-underline'
          >
            All categories
          </Link>
        </div>
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesGrid />
        </Suspense>
      </section>

      {/* Newsletter with gender preference */}
      <section className='border-t'>
        <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 lg:py-16'>
          <div className='max-w-lg mx-auto text-center'>
            <h2 className='text-xl font-bold'>Deals, drops and trends</h2>
            <p className='mt-2 text-sm text-muted-foreground'>
              Straight to your inbox. Enjoy discounts, find fashion inspiration
              and discover fresh arrivals with our curated newsletters.
            </p>
            <div className='mt-4 flex items-center justify-center gap-4'>
              <label className='flex items-center gap-2 text-sm cursor-pointer'>
                <input
                  type='checkbox'
                  defaultChecked
                  className='h-4 w-4 border-foreground accent-foreground'
                />
                Women
              </label>
              <label className='flex items-center gap-2 text-sm cursor-pointer'>
                <input
                  type='checkbox'
                  defaultChecked
                  className='h-4 w-4 border-foreground accent-foreground'
                />
                Men
              </label>
              <label className='flex items-center gap-2 text-sm cursor-pointer'>
                <input
                  type='checkbox'
                  className='h-4 w-4 border-foreground accent-foreground'
                />
                Kids
              </label>
            </div>
            <form className='mt-4 flex gap-0 max-w-sm mx-auto'>
              <input
                type='email'
                placeholder='Your email address'
                className='flex-1 h-11 px-4 border border-r-0 border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground'
              />
              <Button className='h-11 px-6 shrink-0'>Sign up</Button>
            </form>
            <p className='mt-3 text-[11px] text-muted-foreground'>
              You can unsubscribe at any time. Read our{' '}
              <Link href='/privacy' className='underline'>
                privacy notice
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

async function TrendingProducts() {
  try {
    const response = await getProducts({
      size: 12,
      sort: 'sellingPrice',
      direction: 'desc',
    });
    const products = response.data ?? [];
    return <ProductCarousel products={products} />;
  } catch {
    return (
      <p className='text-center text-muted-foreground py-8'>
        Unable to load products right now. Please try again later.
      </p>
    );
  }
}

async function NewArrivals() {
  try {
    const response = await getProducts({
      size: 12,
      sort: 'createdAt',
      direction: 'desc',
    });
    const products = response.data ?? [];
    return <ProductCarousel products={products} />;
  } catch {
    return (
      <p className='text-center text-muted-foreground py-8'>
        Unable to load products right now. Please try again later.
      </p>
    );
  }
}

async function TopBrands() {
  try {
    const response = await getBrands({ size: 20 });
    const brands = response.data ?? [];
    return (
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-3'>
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/products?brandId=${brand.id}`}
            className='text-[13px] font-semibold hover:underline'
          >
            {brand.name}
          </Link>
        ))}
      </div>
    );
  } catch {
    return null;
  }
}

async function CategoriesGrid() {
  try {
    const response = await getCategories({ size: 12 });
    const categories = response.data ?? [];
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3'>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?categoryId=${category.id}`}
            className='text-[13px] text-muted-foreground hover:text-foreground hover:underline py-1.5 border-b border-border'
          >
            {category.name}
            {category.productCount != null && (
              <span className='text-[11px] text-muted-foreground/60 ml-1'>
                ({category.productCount})
              </span>
            )}
          </Link>
        ))}
      </div>
    );
  } catch {
    return (
      <p className='text-center text-muted-foreground py-8'>
        Unable to load categories right now. Please try again later.
      </p>
    );
  }
}

function CarouselSkeleton() {
  return (
    <div className='flex gap-4 overflow-hidden'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='flex-shrink-0 w-[260px] space-y-3'>
          <Skeleton className='aspect-[3/4]' />
          <Skeleton className='h-3 w-3/4' />
          <Skeleton className='h-3 w-1/2' />
        </div>
      ))}
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3'>
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className='h-8' />
      ))}
    </div>
  );
}
