'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@xplaza/utils';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface ProductAccordionProps {
  items: AccordionItem[];
}

export function ProductAccordion({ items }: ProductAccordionProps) {
  return (
    <div className='divide-y'>
      {items.map((item, i) => (
        <AccordionSection key={i} {...item} />
      ))}
    </div>
  );
}

function AccordionSection({
  title,
  content,
  defaultOpen = false,
}: AccordionItem) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        className='flex items-center justify-between w-full py-4 text-left'
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className='text-[14px] font-bold'>{title}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className='pb-4 text-[13px] text-muted-foreground leading-relaxed'>
          {content}
        </div>
      )}
    </div>
  );
}
