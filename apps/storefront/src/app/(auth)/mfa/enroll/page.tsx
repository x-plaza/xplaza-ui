'use client';

import { useState } from 'react';
import { Card, CardContent } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { ShieldCheck } from 'lucide-react';

export default function MfaEnrollPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // TODO: Fetch QR code URI from backend on mount
  const qrCodeUrl = '';

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        // MFA enrollment complete
        window.location.href = '/account/security';
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mx-auto max-w-md px-4 py-24'>
      <Card>
        <CardContent className='p-8'>
          <div className='text-center mb-6'>
            <ShieldCheck className='h-12 w-12 text-primary mx-auto mb-4' />
            <h1 className='text-xl font-semibold'>
              Set Up Two-Factor Authentication
            </h1>
            <p className='text-muted-foreground mt-2 text-sm'>
              Scan the QR code with your authenticator app (Google
              Authenticator, Authy, etc.)
            </p>
          </div>

          {/* QR Code placeholder */}
          <div className='flex justify-center mb-6'>
            <div className='w-48 h-48 bg-muted flex items-center justify-center text-sm text-muted-foreground'>
              {qrCodeUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrCodeUrl} alt='MFA QR Code' className='w-full h-full' />
              ) : (
                'QR Code'
              )}
            </div>
          </div>

          <form onSubmit={handleVerify} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Enter the 6-digit code from your app
              </label>
              <Input
                type='text'
                inputMode='numeric'
                maxLength={6}
                pattern='[0-9]{6}'
                placeholder='000000'
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className='text-center text-lg tracking-widest'
                required
              />
            </div>
            <Button type='submit' className='w-full' disabled={loading || code.length !== 6}>
              {loading ? 'Verifying...' : 'Verify & Enable MFA'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
