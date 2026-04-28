'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@xplaza/ui';

interface Slide {
  id: number;
  image: string;
  label: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  align?: 'left' | 'center' | 'right';
  dark?: boolean;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1440&h=600&fit=crop&crop=center',
    label: 'New Season',
    title: 'Your style, your way',
    subtitle: 'Explore thousands of products from trusted sellers',
    cta: 'Shop now',
    href: '/products',
    align: 'left',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1440&h=600&fit=crop&crop=center',
    label: 'Women',
    title: 'Summer Collection',
    subtitle: 'Lightweight fabrics for warmer days',
    cta: 'Discover',
    href: '/products?gender=women',
    align: 'center',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1440&h=600&fit=crop&crop=center',
    label: 'Men',
    title: 'Smart Casual',
    subtitle: 'Upgrade your everyday look',
    cta: 'Shop Men',
    href: '/products?gender=men',
    align: 'right',
    dark: true,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1440&h=600&fit=crop&crop=center',
    label: 'Limited time',
    title: 'Up to 50% off',
    subtitle: 'Great deals from top brands',
    cta: 'Shop Sale',
    href: '/products?sale=true',
    align: 'left',
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = SLIDES[current]!;
  const textColor = slide.dark ? 'text-white' : 'text-foreground';
  const subtitleColor = slide.dark ? 'text-white/70' : 'text-muted-foreground';

  const alignClass =
    slide.align === 'center'
      ? 'items-center text-center'
      : slide.align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left';

  return (
    <section
      className='relative w-full overflow-hidden'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className='relative h-[420px] sm:h-[480px] lg:h-[560px]'>
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className='absolute inset-0 transition-opacity duration-700 ease-in-out'
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.title}
              className='absolute inset-0 w-full h-full object-cover'
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-black/15' />
          </div>
        ))}

        {/* Content */}
        <div className='relative h-full mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16'>
          <div
            className={`flex flex-col justify-center h-full max-w-lg ${alignClass} ${
              slide.align === 'right' ? 'ml-auto' : ''
            }`}
          >
            <p
              className={`text-[11px] sm:text-[13px] font-semibold uppercase tracking-widest ${subtitleColor} mb-3`}
            >
              {slide.label}
            </p>
            <h2
              className={`text-[32px] sm:text-[40px] lg:text-[48px] font-black leading-[1.05] tracking-tight ${textColor}`}
            >
              {slide.title}
            </h2>
            <p className={`mt-3 text-sm sm:text-base ${subtitleColor} max-w-md`}>
              {slide.subtitle}
            </p>
            <Link href={slide.href} className='mt-6'>
              <Button
                size='lg'
                className={
                  slide.dark
                    ? 'bg-white text-black hover:bg-white/90'
                    : ''
                }
              >
                {slide.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className='absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors'
        aria-label='Previous slide'
      >
        <ChevronLeft className='h-5 w-5' />
      </button>
      <button
        onClick={next}
        className='absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors'
        aria-label='Next slide'
      >
        <ChevronRight className='h-5 w-5' />
      </button>

      {/* Dots */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 transition-all ${
              i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
