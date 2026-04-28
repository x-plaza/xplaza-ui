'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Shield, Download, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPage() {
  const [exporting, setExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleExport() {
    setExporting(true);
    // TODO: call GDPR data export API
    setTimeout(() => setExporting(false), 2000);
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Privacy' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Privacy & Data</h1>

      {/* Data Export */}
      <section className='border p-6 mb-6'>
        <div className='flex items-center gap-3 mb-3'>
          <Download className='h-5 w-5 text-primary' />
          <h2 className='font-semibold'>Export Your Data</h2>
        </div>
        <p className='text-sm text-muted-foreground mb-4'>
          Download a copy of all your personal data, including profile, orders,
          reviews, and preferences. Data will be prepared and sent to your email
          as a JSON file.
        </p>
        <Button
          variant='outline'
          onClick={handleExport}
          disabled={exporting}
          className='gap-1.5'
        >
          <Download className='h-4 w-4' />
          {exporting ? 'Preparing...' : 'Request Data Export'}
        </Button>
      </section>

      {/* Account Deletion */}
      <section className='border border-destructive/30 p-6'>
        <div className='flex items-center gap-3 mb-3'>
          <Trash2 className='h-5 w-5 text-destructive' />
          <h2 className='font-semibold text-destructive'>
            Delete Your Account
          </h2>
        </div>
        <p className='text-sm text-muted-foreground mb-4'>
          Permanently delete your account and all associated data. This action
          is irreversible.
        </p>

        {!showDeleteConfirm ? (
          <Button
            variant='outline'
            className='text-destructive border-destructive/50 hover:bg-destructive/10'
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </Button>
        ) : (
          <div className='bg-destructive/5 p-4'>
            <div className='flex items-center gap-2 mb-3'>
              <AlertTriangle className='h-4 w-4 text-destructive' />
              <p className='text-sm font-medium text-destructive'>
                Are you absolutely sure?
              </p>
            </div>
            <p className='text-xs text-muted-foreground mb-4'>
              All your data, orders, reviews, and settings will be permanently
              deleted. This cannot be undone.
            </p>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                size='sm'
                className='bg-destructive hover:bg-destructive/90 text-white'
              >
                Permanently Delete
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
