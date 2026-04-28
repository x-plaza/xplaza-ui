'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Category } from '@xplaza/types';

interface MegaMenuProps {
  categories: Category[];
  activeNav: string | null;
  onClose: () => void;
}

export function MegaMenu({ categories, activeNav, onClose }: MegaMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!activeNav) return null;

  // Group categories into columns of ~6 items each
  const columns: Category[][] = [];
  const perColumn = 6;
  for (let i = 0; i < categories.length; i += perColumn) {
    columns.push(categories.slice(i, i + perColumn));
  }

  return (
    <div
      ref={ref}
      className='absolute left-0 right-0 top-full bg-background border-b z-50'
      onMouseLeave={onClose}
    >
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-8'>
        <div className='grid grid-cols-4 gap-8'>
          {columns.slice(0, 3).map((col, i) => (
            <div key={i}>
              {col.map((cat) => (
                <div key={cat.id} className='mb-4'>
                  <Link
                    href={`/products?categoryId=${cat.id}`}
                    className='text-[13px] font-bold hover:underline'
                    onClick={onClose}
                  >
                    {cat.name}
                  </Link>
                  {cat.children && cat.children.length > 0 && (
                    <ul className='mt-1.5 space-y-1'>
                      {cat.children.slice(0, 5).map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/products?categoryId=${child.id}`}
                            className='text-[13px] text-muted-foreground hover:text-foreground hover:underline'
                            onClick={onClose}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
          {/* Featured / image column */}
          <div className='relative bg-[#f5f5f5] overflow-hidden flex items-end p-6'>
            <div>
              <p className='text-[11px] uppercase tracking-widest text-muted-foreground mb-1'>
                Trending now
              </p>
              <p className='text-sm font-bold'>New arrivals</p>
              <Link
                href='/products?sort=createdAt&direction=desc'
                className='text-[13px] underline underline-offset-4 mt-2 inline-block hover:no-underline'
                onClick={onClose}
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-6 pt-4 border-t flex gap-6'>
          <Link
            href='/products'
            className='text-[13px] font-semibold underline underline-offset-4 hover:no-underline'
            onClick={onClose}
          >
            View all
          </Link>
          <Link
            href='/brands'
            className='text-[13px] font-semibold underline underline-offset-4 hover:no-underline'
            onClick={onClose}
          >
            All brands
          </Link>
          <Link
            href='/products?sale=true'
            className='text-[13px] font-semibold text-accent underline underline-offset-4 hover:no-underline'
            onClick={onClose}
          >
            Sale
          </Link>
        </div>
      </div>
    </div>
  );
}
