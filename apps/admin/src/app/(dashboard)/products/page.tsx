'use client';

import { Card } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Package, Search } from 'lucide-react';

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Products</h1>
      <div className='flex gap-3 mb-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input className='pl-9' placeholder='Search products...' />
        </div>
      </div>
      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Product</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Shop</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Price</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Stock</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Status</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className='px-4 py-12 text-center text-sm text-muted-foreground'>
                <Package className='h-8 w-8 mx-auto mb-2' />
                No products in the platform.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
