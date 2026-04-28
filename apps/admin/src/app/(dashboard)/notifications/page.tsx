'use client';

import { Card } from '@xplaza/ui';
import { Button } from '@xplaza/ui';
import { Bell, Send } from 'lucide-react';

export default function AdminNotificationsPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Notifications</h1>
        <Button size='sm' className='gap-1.5'>
          <Send className='h-4 w-4' />
          Send Notification
        </Button>
      </div>

      <Card className='p-8 text-center text-muted-foreground'>
        <Bell className='h-10 w-10 mx-auto mb-3' />
        <p className='font-medium'>Notification Center</p>
        <p className='text-sm mt-1'>
          Send push notifications and emails to customers. View notification
          history.
        </p>
      </Card>
    </div>
  );
}
