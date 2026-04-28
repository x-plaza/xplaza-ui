'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Store, Search, Plus } from 'lucide-react';

export default function AdminShopsPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Shops</h1>
        <Button size='sm' className='gap-1.5'>
          <Plus className='h-4 w-4' />
          Add Shop
        </Button>
      </div>

      <div className='flex gap-3 mb-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input className='pl-9' placeholder='Search shops...' />
        </div>
      </div>

      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Shop</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Owner</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Products</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Commission</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Status</th>
              <th className='text-left text-xs font-medium text-muted-foreground px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className='px-4 py-12 text-center text-sm text-muted-foreground'>
                <Store className='h-8 w-8 mx-auto mb-2' />
                No shops registered yet.
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
