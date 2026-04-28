'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { FolderTree, Plus } from 'lucide-react';

export default function AdminCategoriesPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Categories</h1>
        <Button size='sm' className='gap-1.5'>
          <Plus className='h-4 w-4' />
          Add Category
        </Button>
      </div>

      <Card className='p-8 text-center text-muted-foreground'>
        <FolderTree className='h-10 w-10 mx-auto mb-3' />
        <p className='font-medium'>Category Tree</p>
        <p className='text-sm mt-1'>
          Drag-and-drop category tree will render here. Categories can be
          nested with parent/child relationships.
        </p>
      </Card>
    </div>
  );
}
