import { formatCurrency } from '@xplaza/utils';

interface PriceDisplayProps {
  sellingPrice: number;
  compareAtPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({
  sellingPrice,
  compareAtPrice,
  currency = 'USD',
  size = 'md',
}: PriceDisplayProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > sellingPrice;

  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className='flex items-baseline gap-2'>
      <span className={`${sizeClasses[size]} font-bold`}>
        {formatCurrency(sellingPrice, currency)}
      </span>
      {hasDiscount && (
        <>
          <span className='text-sm text-muted-foreground line-through'>
            {formatCurrency(compareAtPrice, currency)}
          </span>
          <span className='text-sm font-medium text-accent'>
            Save{' '}
            {formatCurrency(compareAtPrice - sellingPrice, currency)}
          </span>
        </>
      )}
    </div>
  );
}
