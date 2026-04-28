'use client';

import { useState } from 'react';
import { cn } from '@xplaza/utils';
import type { ProductVariant } from '@xplaza/types';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId?: number;
  onSelect: (variant: ProductVariant) => void;
}

export function ProductVariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: ProductVariantSelectorProps) {
  // Group attributes by name (e.g., "Color", "Size")
  const attributeGroups = new Map<string, Set<string>>();
  for (const variant of variants) {
    for (const attr of variant.attributes) {
      if (!attributeGroups.has(attr.name)) {
        attributeGroups.set(attr.name, new Set());
      }
      attributeGroups.get(attr.name)!.add(attr.value);
    }
  }

  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    const selected = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
    if (selected) {
      for (const attr of selected.attributes) {
        initial[attr.name] = attr.value;
      }
    }
    return initial;
  });

  function handleSelect(attributeName: string, value: string) {
    const next = { ...selections, [attributeName]: value };
    setSelections(next);

    // Find the matching variant
    const match = variants.find((v) =>
      v.attributes.every((attr) => next[attr.name] === attr.value)
    );
    if (match) {
      onSelect(match);
    }
  }

  function isOptionAvailable(attributeName: string, value: string): boolean {
    const hypothetical = { ...selections, [attributeName]: value };
    return variants.some(
      (v) =>
        v.inStock &&
        v.attributes.every((attr) => hypothetical[attr.name] === attr.value)
    );
  }

  return (
    <div className='space-y-4'>
      {Array.from(attributeGroups.entries()).map(([name, values]) => (
        <div key={name}>
          <label className='text-sm font-medium mb-2 block'>
            {name}: <span className='text-muted-foreground'>{selections[name]}</span>
          </label>
          <div className='flex flex-wrap gap-2'>
            {Array.from(values).map((value) => {
              const isSelected = selections[name] === value;
              const available = isOptionAvailable(name, value);

              return (
                <button
                  key={value}
                  type='button'
                  onClick={() => handleSelect(name, value)}
                  disabled={!available}
                  className={cn(
                    'px-4 py-2 text-sm border transition-colors',
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-input hover:border-foreground/30',
                    !available && 'opacity-40 cursor-not-allowed line-through'
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
