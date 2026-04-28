'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Skeleton } from '@xplaza/ui';
import { Bell, Package, Tag, Info } from 'lucide-react';
import { cn } from '@xplaza/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markNotificationRead, type Notification } from '@/lib/queries';

export default function NotificationsPage() {
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });

  const notifications: Notification[] = response?.data ?? [];

  const markReadMutation = useMutation({
    mutationFn: (id: number) => markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  if (isLoading) {
    return (
      <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs
          items={[
            { label: 'My Account', href: '/account' },
            { label: 'Notifications' },
          ]}
        />
        <h1 className='text-2xl font-bold mb-6'>Notifications</h1>
        <div className='space-y-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='h-16' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
      <Breadcrumbs
        items={[
          { label: 'My Account', href: '/account' },
          { label: 'Notifications' },
        ]}
      />
      <h1 className='text-2xl font-bold mb-6'>Notifications</h1>

      {notifications.length === 0 ? (
        <div className='text-center py-12 border'>
          <Bell className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
          <p className='text-muted-foreground'>No notifications yet.</p>
        </div>
      ) : (
        <div className='divide-y border'>
          {notifications.map((notif) => {
            const IconComponent = notif.type === 'order' ? Package : notif.type === 'promo' ? Tag : Info;
            return (
              <button
                key={notif.id}
                className={cn(
                  'flex items-start gap-4 p-4 w-full text-left',
                  !notif.read && 'bg-primary/5'
                )}
                onClick={() => {
                  if (!notif.read) markReadMutation.mutate(notif.id);
                }}
              >
                <IconComponent className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                <div className='flex-1'>
                  <p className='text-sm font-medium'>{notif.title}</p>
                  <p className='text-sm text-muted-foreground'>
                    {notif.message}
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {!notif.read && (
                  <div className='h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2' />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
