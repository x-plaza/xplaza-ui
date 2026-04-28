'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@xplaza/utils';
import type { ProductImage } from '@xplaza/types';

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const sorted = [...images].sort((a, b) => a.position - b.position);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = sorted[selectedIndex];

  if (sorted.length === 0) {
    return (
      <div className='aspect-[3/4] bg-muted flex items-center justify-center text-muted-foreground'>
        No Image Available
      </div>
    );
  }

  return (
    <div className='flex gap-3'>
      {/* Vertical thumbnails — left side (Zalando layout) */}
      {sorted.length > 1 && (
        <div className='hidden sm:flex flex-col gap-2 flex-shrink-0'>
          {sorted.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden border-2 transition-colors',
                index === selectedIndex
                  ? 'border-primary'
                  : 'border-transparent hover:border-muted-foreground/50'
              )}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${productName} ${index + 1}`}
                fill
                sizes='64px'
                className='object-cover'
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image — right side */}
      <div className='relative flex-1 aspect-[3/4] overflow-hidden bg-muted'>
        {selectedImage && (
          <Image
            src={selectedImage.url}
            alt={selectedImage.altText ?? productName}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
            priority
          />
        )}
      </div>

      {/* Mobile horizontal thumbnails */}
      {sorted.length > 1 && (
        <div className='flex sm:hidden gap-2 overflow-x-auto pb-1 absolute bottom-0 left-0 right-0 px-2'>
          {sorted.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative h-12 w-12 flex-shrink-0 overflow-hidden border-2 transition-colors',
                index === selectedIndex
                  ? 'border-primary'
                  : 'border-transparent'
              )}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${productName} ${index + 1}`}
                fill
                sizes='48px'
                className='object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
