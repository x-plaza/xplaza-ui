'use client';

import { useParams } from 'next/navigation';
import { Button } from '@xplaza/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div className='flex items-center gap-3 mb-6'>
        <Link href='/products'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <h1 className='text-2xl font-bold'>Edit Product #{id}</h1>
      </div>

      <div className='rounded-lg border p-8 text-center text-muted-foreground'>
        <p>Product edit form — same structure as "New Product" form.</p>
        <p className='text-sm mt-1'>
          Will be pre-populated with product data when API is integrated.
        </p>
      </div>
    </div>
  );
}
