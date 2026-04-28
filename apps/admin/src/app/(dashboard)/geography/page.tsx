'use client';

import { Card } from '@xplaza/ui';
import { Globe } from 'lucide-react';

export default function AdminGeographyPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Geography</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Countries</h2>
          <div className='text-center py-8 text-sm text-muted-foreground'>
            <Globe className='h-8 w-8 mx-auto mb-2' />
            Country list from API
          </div>
        </Card>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>States / Provinces</h2>
          <div className='text-center py-8 text-sm text-muted-foreground'>
            Select a country to view states
          </div>
        </Card>
        <Card className='p-6'>
          <h2 className='font-semibold mb-4'>Cities</h2>
          <div className='text-center py-8 text-sm text-muted-foreground'>
            Select a state to view cities
          </div>
        </Card>
      </div>
    </div>
  );
}
