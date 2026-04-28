'use client';

import { Button } from '@xplaza/ui';
import { Card } from '@xplaza/ui';
import { Upload, FileSpreadsheet, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ImportProductsPage() {
  return (
    <div>
      <div className='flex items-center gap-3 mb-6'>
        <Link href='/products'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <h1 className='text-2xl font-bold'>Import Products</h1>
      </div>

      <Card className='p-8 max-w-xl'>
        <div className='text-center'>
          <FileSpreadsheet className='h-12 w-12 text-primary mx-auto mb-4' />
          <h2 className='font-semibold mb-2'>Upload CSV File</h2>
          <p className='text-sm text-muted-foreground mb-6'>
            Import products in bulk using a CSV file. Download the template to
            see the required format.
          </p>

          <div className='border-dashed border-2 rounded-lg p-8 mb-4'>
            <Upload className='h-8 w-8 text-muted-foreground mx-auto mb-2' />
            <p className='text-sm text-muted-foreground'>
              Drag & drop your CSV file or click to browse
            </p>
          </div>

          <div className='flex gap-3 justify-center'>
            <Button variant='outline'>Download Template</Button>
            <Button>Upload & Import</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
