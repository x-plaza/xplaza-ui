'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@xplaza/ui';
import { Bell } from 'lucide-react';
import { cn } from '@xplaza/utils';

const PREF_GROUPS = [
  {
    label: 'Orders & Shipping',
    prefs: [
      { id: 'order_confirmation', label: 'Order confirmation', defaultOn: true },
      { id: 'shipping_updates', label: 'Shipping updates', defaultOn: true },
      { id: 'delivery_reminders', label: 'Delivery reminders', defaultOn: true },
    ],
  },
  {
    label: 'Promotions & Deals',
    prefs: [
      { id: 'weekly_deals', label: 'Weekly deals', defaultOn: false },
      { id: 'flash_sales', label: 'Flash sale alerts', defaultOn: false },
      { id: 'personalized_recs', label: 'Personalized recommendations', defaultOn: false },
    ],
  },
  {
    label: 'Account',
    prefs: [
      { id: 'security_alerts', label: 'Security alerts', defaultOn: true },
      { id: 'review_responses', label: 'Responses to your reviews', defaultOn: true },
      { id: 'loyalty_updates', label: 'Loyalty program updates', defaultOn: false },
    ],
  },
];

export default function NotificationPreferencesPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PREF_GROUPS.forEach((group) =>
      group.prefs.forEach((p) => {
        initial[p.id] = p.defaultOn;
      })
    );
    return initial;
  });

  function toggle(id: string) {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleSave() {
    // TODO: save preferences via API
  }

  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Notification Preferences' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Notification Preferences</h1>

      <div className='space-y-6'>
        {PREF_GROUPS.map((group) => (
          <section key={group.label} className='border p-6'>
            <h2 className='font-semibold mb-4'>{group.label}</h2>
            <div className='space-y-3'>
              {group.prefs.map((pref) => (
                <div
                  key={pref.id}
                  className='flex items-center justify-between'
                >
                  <span className='text-sm'>{pref.label}</span>
                  <button
                    type='button'
                    role='switch'
                    aria-checked={prefs[pref.id]}
                    onClick={() => toggle(pref.id)}
                    className={cn(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      prefs[pref.id] ? 'bg-primary' : 'bg-muted'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        prefs[pref.id] ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className='pt-6'>
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
}
