'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Shield, Smartphone, Key } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/lib/queries';

export default function SecurityPage() {
  const [changingPassword, setChangingPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const passwordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      changePassword(currentPassword, newPassword),
    onSuccess: () => {
      setChangingPassword(false);
      setSuccess('Password updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    },
    onError: () => {
      setError('Could not change password. Check your current password and try again.');
    },
  });

  function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const currentPassword = form.get('currentPassword') as string;
    const newPassword = form.get('newPassword') as string;
    const confirmPassword = form.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }

    passwordMutation.mutate({ currentPassword, newPassword });
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Security' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Security Settings</h1>

      {/* Password Section */}
      <section className='border p-6 mb-6'>
        <div className='flex items-center gap-3 mb-4'>
          <Key className='h-5 w-5 text-primary' />
          <h2 className='font-semibold'>Password</h2>
        </div>

        {!changingPassword ? (
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>
                Last changed: Unknown
              </p>
              {success && (
                <p className='text-sm text-green-600 mt-1'>{success}</p>
              )}
            </div>
            <Button
              size='sm'
              variant='outline'
              onClick={() => setChangingPassword(true)}
            >
              Change Password
            </Button>
          </div>
        ) : (
          <form onSubmit={handlePasswordChange} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Current Password
              </label>
              <Input name='currentPassword' type='password' required autoComplete='current-password' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                New Password
              </label>
              <Input name='newPassword' type='password' required autoComplete='new-password' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Confirm New Password
              </label>
              <Input name='confirmPassword' type='password' required autoComplete='new-password' />
            </div>
            {error && <p className='text-sm text-destructive'>{error}</p>}
            <div className='flex gap-2'>
              <Button type='submit' disabled={passwordMutation.isPending}>
                {passwordMutation.isPending ? 'Updating...' : 'Update Password'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => { setChangingPassword(false); setError(''); }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </section>

      {/* MFA Section */}
      <section className='border p-6 mb-6'>
        <div className='flex items-center gap-3 mb-4'>
          <Smartphone className='h-5 w-5 text-primary' />
          <h2 className='font-semibold'>Two-Factor Authentication (2FA)</h2>
        </div>
        <p className='text-sm text-muted-foreground mb-4'>
          Add an extra layer of security to your account by requiring a TOTP
          code from an authenticator app.
        </p>
        {mfaEnabled ? (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Shield className='h-4 w-4 text-green-600' />
              <span className='text-sm font-medium text-green-600'>
                Enabled
              </span>
            </div>
            <Button
              size='sm'
              variant='outline'
              onClick={() => setMfaEnabled(false)}
            >
              Disable 2FA
            </Button>
          </div>
        ) : (
          <Button onClick={() => setMfaEnabled(true)}>Enable 2FA</Button>
        )}
      </section>

      {/* Active Sessions */}
      <section className='border p-6'>
        <h2 className='font-semibold mb-4'>Active Sessions</h2>
        <div className='space-y-3'>
          <div className='flex items-center justify-between text-sm'>
            <div>
              <p className='font-medium'>Current session</p>
              <p className='text-muted-foreground'>Browser &middot; Now</p>
            </div>
            <span className='text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full'>
              Active
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
