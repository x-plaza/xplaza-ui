'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Card } from '@xplaza/ui';
import { ArrowLeft, ImagePlus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Variant {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([]);

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: '', sku: '', price: '', stock: '' },
    ]);
  }

  function removeVariant(id: string) {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: call product creation API
    setTimeout(() => router.push('/products'), 800);
  }

  return (
    <div>
      <div className='flex items-center gap-3 mb-6'>
        <Link href='/products'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <h1 className='text-2xl font-bold'>New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6 max-w-3xl'>
        {/* Basic Info */}
        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>Basic Information</h2>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Product Name *
            </label>
            <Input required placeholder='Enter product name' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Description
            </label>
            <textarea
              className='flex min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              placeholder='Describe your product...'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                SKU *
              </label>
              <Input required placeholder='e.g. PROD-001' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Category
              </label>
              <Input placeholder='Select category' />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Brand
              </label>
              <Input placeholder='Brand name' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Weight (kg)
              </label>
              <Input type='number' step='0.01' placeholder='0.00' />
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>Pricing</h2>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Selling Price *
              </label>
              <Input type='number' step='0.01' required placeholder='0.00' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Compare-at Price
              </label>
              <Input type='number' step='0.01' placeholder='0.00' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Cost Price
              </label>
              <Input type='number' step='0.01' placeholder='0.00' />
            </div>
          </div>
        </Card>

        {/* Inventory */}
        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>Inventory</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Stock Quantity *
              </label>
              <Input type='number' required placeholder='0' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Low Stock Alert
              </label>
              <Input type='number' placeholder='10' />
            </div>
          </div>
        </Card>

        {/* Images */}
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Images</h2>
          <div className='border-dashed border-2 rounded-lg p-8 text-center text-muted-foreground'>
            <ImagePlus className='h-10 w-10 mx-auto mb-2' />
            <p className='text-sm'>Drag & drop images or click to upload</p>
            <p className='text-xs mt-1'>Up to 10 images, 5MB each</p>
          </div>
        </Card>

        {/* Variants */}
        <Card className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='font-semibold'>Variants</h2>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={addVariant}
              className='gap-1'
            >
              <Plus className='h-4 w-4' />
              Add Variant
            </Button>
          </div>

          {variants.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              No variants. Add variants for different sizes, colors, etc.
            </p>
          ) : (
            <div className='space-y-3'>
              {variants.map((v) => (
                <div key={v.id} className='flex items-center gap-3'>
                  <Input placeholder='Variant name' className='flex-1' />
                  <Input placeholder='SKU' className='w-28' />
                  <Input placeholder='Price' type='number' className='w-24' />
                  <Input placeholder='Stock' type='number' className='w-20' />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => removeVariant(v.id)}
                  >
                    <Trash2 className='h-4 w-4 text-destructive' />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* SEO */}
        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>SEO</h2>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Meta Title
            </label>
            <Input placeholder='SEO-friendly title' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Meta Description
            </label>
            <textarea
              className='flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              placeholder='Brief description for search engines'
            />
          </div>
        </Card>

        {/* Submit */}
        <div className='flex gap-3'>
          <Button type='submit' disabled={loading}>
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.push('/products')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
