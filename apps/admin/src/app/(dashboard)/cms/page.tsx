'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { FileText, Plus, Image, HelpCircle } from 'lucide-react';

export default function AdminCmsPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Content Management</h1>
        <Button size='sm' className='gap-1.5'>
          <Plus className='h-4 w-4' />
          New Page
        </Button>
      </div>

      <div className='flex gap-2 mb-6'>
        {['Pages', 'Banners', 'Blocks', 'FAQ'].map((tab) => (
          <Button key={tab} variant={tab === 'Pages' ? 'default' : 'outline'} size='sm'>
            {tab}
          </Button>
        ))}
      </div>

      <Card className='p-8 text-center text-muted-foreground'>
        <FileText className='h-10 w-10 mx-auto mb-3' />
        <p className='font-medium'>No CMS Pages</p>
        <p className='text-sm mt-1'>
          Create pages with the TipTap rich text editor. Manage banners, content blocks, and FAQ sections.
        </p>
      </Card>
    </div>
  );
}
