'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { verifyEmail } from '@/lib/queries';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>(
    token ? 'verifying' : 'error'
  );

  useEffect(() => {
    if (!token) return;

    async function verify() {
      try {
        await verifyEmail(token!);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    }

    verify();
  }, [token]);

  return (
    <div className='mx-auto max-w-md px-4 py-24'>
      <Card>
        <CardContent className='p-8 text-center'>
          {status === 'verifying' && (
            <>
              <Loader2 className='h-12 w-12 animate-spin text-primary mx-auto mb-4' />
              <h1 className='text-xl font-semibold'>Verifying your email...</h1>
              <p className='text-muted-foreground mt-2'>
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className='h-12 w-12 text-green-600 mx-auto mb-4' />
              <h1 className='text-xl font-semibold'>Email Verified!</h1>
              <p className='text-muted-foreground mt-2'>
                Your email has been verified successfully. You can now sign in.
              </p>
              <Link href='/login' className='mt-6 inline-block'>
                <Button>Sign In</Button>
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className='h-12 w-12 text-red-600 mx-auto mb-4' />
              <h1 className='text-xl font-semibold'>Verification Failed</h1>
              <p className='text-muted-foreground mt-2'>
                {token
                  ? 'The verification link is invalid or has expired.'
                  : 'No verification token provided.'}
              </p>
              <Link href='/login' className='mt-6 inline-block'>
                <Button variant='outline'>Go to Login</Button>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
