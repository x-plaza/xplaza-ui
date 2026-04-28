'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@xplaza/ui';
import type { PaginationMeta } from '@xplaza/types';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  const { page, totalPages, hasPrevious, hasNext } = meta;

  if (totalPages <= 1) return null;

  const pages: (number | 'ellipsis')[] = [];
  const maxVisible = 5;
  let start = Math.max(0, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible);
  if (end - start < maxVisible) {
    start = Math.max(0, end - maxVisible);
  }

  if (start > 0) {
    pages.push(0);
    if (start > 1) pages.push('ellipsis');
  }
  for (let i = start; i < end; i++) {
    pages.push(i);
  }
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('ellipsis');
    pages.push(totalPages - 1);
  }

  return (
    <nav aria-label='Pagination' className='flex items-center justify-center gap-1 py-8'>
      <Button
        variant='outline'
        size='icon'
        disabled={!hasPrevious}
        onClick={() => onPageChange(page - 1)}
        aria-label='Previous page'
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} className='px-2 text-muted-foreground'>
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? 'default' : 'outline'}
            size='icon'
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p + 1}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p + 1}
          </Button>
        )
      )}
      <Button
        variant='outline'
        size='icon'
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        aria-label='Next page'
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </nav>
  );
}
