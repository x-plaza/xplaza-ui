import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, slugify, truncate, cn } from '@xplaza/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra');
  });

  it('deduplicates tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(29.99)).toBe('$29.99');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats EUR', () => {
    const result = formatCurrency(100, 'EUR', 'de-DE');
    expect(result).toContain('100');
  });
});

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2024-06-15');
    expect(result).toContain('2024');
    expect(result).toContain('Jun');
  });

  it('formats a Date object', () => {
    const result = formatDate(new Date(2024, 0, 1));
    expect(result).toContain('Jan');
    expect(result).toContain('2024');
  });
});

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Product #1 (New!)')).toBe('product-1-new');
  });

  it('trims leading/trailing dashes', () => {
    expect(slugify('  hello  ')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });
});

describe('truncate', () => {
  it('does not truncate short text', () => {
    expect(truncate('short', 10)).toBe('short');
  });

  it('truncates long text with ellipsis', () => {
    const result = truncate('This is a very long description', 10);
    expect(result.length).toBeLessThanOrEqual(11); // 10 + ellipsis
    expect(result).toContain('…');
  });

  it('handles exact length', () => {
    expect(truncate('exact', 5)).toBe('exact');
  });
});
