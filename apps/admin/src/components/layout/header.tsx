import { Bell, User } from 'lucide-react';
import { Button } from '@xplaza/ui';

export function Header() {
  return (
    <header className='sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur px-6'>
      <h2 className='text-sm font-medium text-muted-foreground'>
        Admin Panel
      </h2>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='sm'>
          <Bell className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='sm'>
          <User className='h-4 w-4' />
        </Button>
      </div>
    </header>
  );
}
