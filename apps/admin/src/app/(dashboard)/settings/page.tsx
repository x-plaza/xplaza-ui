'use client';

import { useState } from 'react';
import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Platform Settings</h1>

      <form onSubmit={handleSubmit} className='space-y-6 max-w-2xl'>
        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>General</h2>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Platform Name
            </label>
            <Input defaultValue='X-Plaza' required />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Default Currency
              </label>
              <Input defaultValue='USD' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Default Locale
              </label>
              <Input defaultValue='en' />
            </div>
          </div>
        </Card>

        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>Commission</h2>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Default Commission Rate (%)
            </label>
            <Input type='number' step='0.1' defaultValue='10' />
          </div>
        </Card>

        <Card className='p-6 space-y-4'>
          <h2 className='font-semibold'>Email</h2>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Support Email
            </label>
            <Input type='email' placeholder='support@xplaza.com' />
          </div>
        </Card>

        <Button type='submit' disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
}
