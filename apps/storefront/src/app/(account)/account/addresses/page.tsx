'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Input } from '@xplaza/ui';
import { Skeleton } from '@xplaza/ui';
import { Plus, Trash2, Pencil, MapPin, Check } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAddresses,
  createAddress,
  deleteAddress,
  type Address,
} from '@/lib/queries';

export default function AddressesPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { data: response, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => getAddresses(),
  });

  const addresses: Address[] = response?.data ?? [];

  const createMutation = useMutation({
    mutationFn: (data: Omit<Address, 'id'>) => createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    createMutation.mutate({
      firstName: form.get('firstName') as string,
      lastName: form.get('lastName') as string,
      addressLine1: form.get('line1') as string,
      addressLine2: (form.get('line2') as string) || undefined,
      city: form.get('city') as string,
      state: form.get('state') as string,
      postalCode: form.get('postalCode') as string,
      country: form.get('country') as string,
      phone: (form.get('phone') as string) || undefined,
    });
  }

  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Addresses' },
        ]}
      />
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Address Book</h1>
        <Button
          size='sm'
          className='gap-1'
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className='h-4 w-4' />
          Add Address
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className='border p-6 mb-6 space-y-4'
        >
          <h2 className='font-semibold'>New Address</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>First Name</label>
              <Input name='firstName' required />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>Last Name</label>
              <Input name='lastName' required />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Address Line 1
            </label>
            <Input name='line1' required />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>
              Address Line 2
            </label>
            <Input name='line2' />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>City</label>
              <Input name='city' required />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>State</label>
              <Input name='state' required />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Postal Code
              </label>
              <Input name='postalCode' required />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1.5'>
                Country
              </label>
              <Input name='country' required />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium mb-1.5'>Phone</label>
            <Input name='phone' type='tel' />
          </div>
          <div className='flex gap-2'>
            <Button type='submit' disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Saving...' : 'Save Address'}
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {isLoading && (
        <div className='space-y-4'>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className='h-28' />
          ))}
        </div>
      )}

      {!isLoading && addresses.length === 0 && !showForm && (
        <div className='text-center py-12 border'>
          <MapPin className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
          <p className='text-muted-foreground'>No addresses saved yet.</p>
        </div>
      )}

      <div className='space-y-4'>
        {addresses.map((addr) => (
          <div key={addr.id} className='border p-4'>
            <div className='flex items-start justify-between'>
              <div>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>
                    {addr.firstName} {addr.lastName}
                  </span>
                  {addr.isDefault && (
                    <span className='text-xs bg-primary/10 text-primary px-2 py-0.5'>
                      Default
                    </span>
                  )}
                </div>
                <p className='text-sm text-muted-foreground mt-1'>
                  {addr.addressLine1}
                  {addr.addressLine2 && `, ${addr.addressLine2}`}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                </p>
                {addr.phone && (
                  <p className='text-sm text-muted-foreground'>{addr.phone}</p>
                )}
              </div>
              <div className='flex gap-1'>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => addr.id && deleteMutation.mutate(addr.id)}
                  title='Remove'
                >
                  <Trash2 className='h-4 w-4 text-destructive' />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
