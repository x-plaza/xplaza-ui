'use client';

import { useState } from 'react';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Card } from '@xplaza/ui';
import { Plus, Search, Upload } from 'lucide-react';
import Link from 'next/link';

export default function VendorProductsPage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <div className='flex gap-2'>
          <Link href='/products/import'>
            <Button variant='outline' size='sm' className='gap-1.5'>
              <Upload className='h-4 w-4' />
              Import CSV
            </Button>
          </Link>
          <Link href='/products/new'>
            <Button size='sm' className='gap-1.5'>
              <Plus className='h-4 w-4' />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className='flex gap-3 mb-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            className='pl-9'
            placeholder='Search products...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Product Table */}
      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Product
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                SKU
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Price
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Stock
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Status
              </th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={6}
                className='px-4 py-12 text-center text-sm text-muted-foreground'
              >
                No products yet. Click "Add Product" to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
