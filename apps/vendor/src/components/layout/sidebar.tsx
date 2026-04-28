'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Warehouse,
  Truck,
  Tag,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@xplaza/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Orders', href: '/orders', icon: ShoppingCart },
  { label: 'Reviews', href: '/reviews', icon: MessageSquare },
  { label: 'Inventory', href: '/inventory', icon: Warehouse },
  { label: 'Delivery', href: '/delivery', icon: Truck },
  { label: 'Promotions', href: '/promotions', icon: Tag },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='fixed inset-y-0 left-0 z-50 w-64 border-r bg-background flex flex-col'>
      <div className='flex h-14 items-center border-b px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <span className='text-lg font-bold text-primary'>X-Plaza</span>
          <span className='text-xs bg-primary/10 text-primary px-2 py-0.5 rounded'>
            Vendor
          </span>
        </Link>
      </div>

      <nav className='flex-1 overflow-y-auto px-3 py-4 space-y-1'>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className='h-4 w-4' />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className='border-t p-3'>
        <button className='flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'>
          <LogOut className='h-4 w-4' />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
