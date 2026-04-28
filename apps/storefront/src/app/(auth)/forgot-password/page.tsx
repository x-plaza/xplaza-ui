'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Mail } from 'lucide-react';
import { forgotPassword } from '@/lib/queries';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className='mx-auto max-w-md px-4 py-16 text-center'>
        <Mail className='h-12 w-12 text-primary mx-auto mb-4' />
        <h1 className='text-2xl font-bold'>Check Your Email</h1>
        <p className='text-muted-foreground mt-2'>
          We&apos;ve sent a password reset link to <strong>{email}</strong>.
          Please check your inbox.
        </p>
        <Link href='/login'>
          <Button variant='outline' className='mt-6'>
            Back to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-md px-4 py-16'>
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold'>Forgot Password</h1>
        <p className='text-muted-foreground mt-2'>
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && (
          <div className='bg-destructive/10 text-destructive text-sm p-3'>
            {error}
          </div>
        )}

        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-1.5'>
            Email
          </label>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            required
            autoComplete='email'
          />
        </div>

        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      <p className='text-center text-sm text-muted-foreground mt-6'>
        Remember your password?{' '}
        <Link href='/login' className='text-primary hover:underline font-medium'>
          Sign in
        </Link>
      </p>
    </div>
  );
}
