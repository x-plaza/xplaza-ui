'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function AdminSearchPage() {
  const [reindexing, setReindexing] = useState(false);

  function handleReindex() {
    setReindexing(true);
    // TODO: trigger Elasticsearch reindex via API
    setTimeout(() => setReindexing(false), 3000);
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Search Management</h1>

      <Card className='p-6 mb-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='font-semibold'>Elasticsearch Index</h2>
            <p className='text-sm text-muted-foreground mt-1'>
              Trigger a full reindex of the product search index.
            </p>
          </div>
          <Button
            onClick={handleReindex}
            disabled={reindexing}
            className='gap-1.5'
          >
            <RefreshCw className={`h-4 w-4 ${reindexing ? 'animate-spin' : ''}`} />
            {reindexing ? 'Reindexing...' : 'Reindex Now'}
          </Button>
        </div>
      </Card>

      <Card className='p-6'>
        <h2 className='font-semibold mb-4'>Index Status</h2>
        <div className='grid grid-cols-3 gap-4'>
          <div className='rounded-lg bg-muted p-4 text-center'>
            <p className='text-2xl font-bold'>0</p>
            <p className='text-xs text-muted-foreground'>Documents</p>
          </div>
          <div className='rounded-lg bg-muted p-4 text-center'>
            <p className='text-2xl font-bold'>—</p>
            <p className='text-xs text-muted-foreground'>Last Reindex</p>
          </div>
          <div className='rounded-lg bg-muted p-4 text-center'>
            <p className='text-2xl font-bold'>—</p>
            <p className='text-xs text-muted-foreground'>Index Size</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
