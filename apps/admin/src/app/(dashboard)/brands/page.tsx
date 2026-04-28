'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Tag, Plus, Search } from 'lucide-react';

export default function AdminBrandsPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Brands</h1>
        <Button size='sm' className='gap-1.5'>
          <Plus className='h-4 w-4' />
          Add Brand
        </Button>
      </div>
      <div className='flex gap-3 mb-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input className='pl-9' placeholder='Search brands...' />
        </div>
      </div>
      <Card className='p-8 text-center text-muted-foreground'>
        <Tag className='h-8 w-8 mx-auto mb-2' />
        No brands registered yet.
      </Card>
    </div>
  );
}
