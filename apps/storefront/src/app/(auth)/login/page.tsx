'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { useAuth } from '@/hooks/use-auth';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.mfaRequired) {
        router.push('/mfa/verify');
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full max-w-[380px] px-4 py-16'>
      <div className='text-center mb-8'>
        <Link href='/' className='inline-block mb-6'>
          <span className='text-[22px] font-black tracking-tight uppercase'>X-PLAZA</span>
        </Link>
        <h1 className='text-xl font-bold'>Sign in</h1>
      </div>

      {/* Social login buttons */}
      <div className='space-y-3 mb-6'>
        <button className='w-full h-11 border flex items-center justify-center gap-3 text-[13px] font-semibold hover:bg-secondary transition-colors'>
          <svg className='h-5 w-5' viewBox='0 0 24 24'>
            <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z' fill='#4285F4' />
            <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='#34A853' />
            <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' fill='#FBBC05' />
            <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='#EA4335' />
          </svg>
          Continue with Google
        </button>
        <button className='w-full h-11 border flex items-center justify-center gap-3 text-[13px] font-semibold hover:bg-secondary transition-colors'>
          <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.11 4.45-3.74 4.25z' />
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className='relative my-6'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-background px-4 text-[13px] text-muted-foreground'>
            or sign in with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <div className='bg-destructive/10 text-destructive text-[13px] p-3 font-medium'>
              {error}
            </div>
          )}

          <div>
            <label htmlFor='email' className='block text-[13px] font-bold mb-1.5'>
              Email address
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

          <div>
            <div className='flex items-center justify-between mb-1.5'>
              <label htmlFor='password' className='text-[13px] font-bold'>
                Password
              </label>
              <Link
                href='/forgot-password'
                className='text-[13px] text-foreground underline underline-offset-4 hover:no-underline'
              >
                Forgot?
              </Link>
            </div>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                required
                autoComplete='current-password'
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
          </div>

          <Button type='submit' className='w-full h-11' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className='text-center text-[13px] text-muted-foreground mt-8'>
          New to X-Plaza?{' '}
          <Link href='/register' className='text-foreground font-bold underline underline-offset-4 hover:no-underline'>
            Create an account
          </Link>
        </p>
      </div>
  );
}
