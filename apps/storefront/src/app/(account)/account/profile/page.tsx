'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { useAuth } from '@/hooks/use-auth';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '@/lib/queries';

export default function ProfilePage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: (data: { firstName: string; lastName: string; phone?: string; dateOfBirth?: string }) =>
      updateProfile(data),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
    onError: () => {
      setError('Could not update profile. Please try again.');
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    mutation.mutate({
      firstName: form.get('firstName') as string,
      lastName: form.get('lastName') as string,
      phone: (form.get('phone') as string) || undefined,
      dateOfBirth: (form.get('dateOfBirth') as string) || undefined,
    });
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Profile' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Edit Profile</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              First Name
            </label>
            <Input name='firstName' defaultValue={user?.firstName ?? ''} required />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Last Name
            </label>
            <Input name='lastName' defaultValue={user?.lastName ?? ''} required />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-1.5'>Email</label>
          <Input
            type='email'
            defaultValue={user?.email ?? ''}
            required
            disabled
          />
          <p className='text-xs text-muted-foreground mt-1'>
            Contact support to change your email.
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium mb-1.5'>Phone</label>
          <Input name='phone' type='tel' defaultValue='' />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1.5'>
            Date of Birth
          </label>
          <Input name='dateOfBirth' type='date' />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}

        <div className='pt-4 flex items-center gap-4'>
          <Button type='submit' disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
          {saved && (
            <span className='text-sm text-green-600'>
              Profile updated successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
