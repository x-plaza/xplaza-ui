'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { CheckCircle } from 'lucide-react';
import { resetPassword } from '@/lib/queries';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className='mx-auto max-w-md px-4 py-16 text-center'>
        <CheckCircle className='h-12 w-12 text-green-600 mx-auto mb-4' />
        <h1 className='text-2xl font-bold'>Password Reset</h1>
        <p className='text-muted-foreground mt-2'>
          Your password has been reset successfully.
        </p>
        <Link href='/login'>
          <Button className='mt-6'>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-md px-4 py-16'>
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold'>Reset Password</h1>
        <p className='text-muted-foreground mt-2'>Enter your new password</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && (
          <div className='bg-destructive/10 text-destructive text-sm p-3'>
            {error}
          </div>
        )}

        <div>
          <label htmlFor='password' className='block text-sm font-medium mb-1.5'>
            New Password
          </label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='••••••••'
            required
            minLength={8}
            autoComplete='new-password'
          />
        </div>

        <div>
          <label htmlFor='confirmPassword' className='block text-sm font-medium mb-1.5'>
            Confirm Password
          </label>
          <Input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='••••••••'
            required
            autoComplete='new-password'
          />
        </div>

        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}
