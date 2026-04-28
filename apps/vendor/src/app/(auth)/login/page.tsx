'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';

export default function VendorLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: vendor auth
    setTimeout(() => router.push('/'), 500);
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-sm space-y-6 px-4'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-primary'>X-Plaza</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Vendor Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1.5'>Email</label>
            <Input type='email' required autoComplete='email' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Password
            </label>
            <Input type='password' required autoComplete='current-password' />
          </div>
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
