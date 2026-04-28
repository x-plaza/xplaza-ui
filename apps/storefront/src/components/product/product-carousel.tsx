'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@xplaza/types';

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
  }, [products]);

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('article')?.offsetWidth ?? 260;
    const amount = cardWidth * 2.5;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  return (
    <div className='relative group/carousel'>
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className='flex gap-4 overflow-x-auto scroll-smooth no-scrollbar'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <article
            key={product.id}
            className='flex-shrink-0 w-[200px] sm:w-[220px] lg:w-[260px]'
          >
            <ProductCard product={product} />
          </article>
        ))}
      </div>

      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className='absolute left-0 top-1/3 -translate-y-1/2 h-10 w-10 bg-white border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-secondary'
          aria-label='Scroll left'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className='absolute right-0 top-1/3 -translate-y-1/2 h-10 w-10 bg-white border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-secondary'
          aria-label='Scroll right'
        >
          <ChevronRight className='h-5 w-5' />
        </button>
      )}
    </div>
  );
}
