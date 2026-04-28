'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Package,
  FolderTree,
  Tag as TagIcon,
  ShoppingCart,
  Users,
  CreditCard,
  MessageSquare,
  Percent,
  Truck,
  Warehouse,
  FileText,
  Gift,
  Globe,
  Calendar,
  Search,
  Bell,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@xplaza/utils';

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard },
      { label: 'Shops', href: '/shops', icon: Store },
      { label: 'Products', href: '/products', icon: Package },
      { label: 'Categories', href: '/categories', icon: FolderTree },
      { label: 'Brands', href: '/brands', icon: TagIcon },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { label: 'Orders', href: '/orders', icon: ShoppingCart },
      { label: 'Customers', href: '/customers', icon: Users },
      { label: 'Payments', href: '/payments', icon: CreditCard },
      { label: 'Reviews', href: '/reviews', icon: MessageSquare },
      { label: 'Promotions', href: '/promotions', icon: Percent },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Fulfillment', href: '/fulfillment', icon: Truck },
      { label: 'Inventory', href: '/inventory', icon: Warehouse },
      { label: 'CMS', href: '/cms', icon: FileText },
      { label: 'Gift Cards', href: '/gift-cards', icon: Gift },
      { label: 'Geography', href: '/geography', icon: Globe },
      { label: 'Delivery', href: '/delivery', icon: Calendar },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Search', href: '/search', icon: Search },
      { label: 'Notifications', href: '/notifications', icon: Bell },
      { label: 'Analytics', href: '/analytics', icon: BarChart3 },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='fixed inset-y-0 left-0 z-50 w-64 border-r bg-background flex flex-col'>
      <div className='flex h-14 items-center border-b px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <span className='text-lg font-bold text-primary'>X-Plaza</span>
          <span className='text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded'>
            Admin
          </span>
        </Link>
      </div>

      <nav className='flex-1 overflow-y-auto px-3 py-4 space-y-6'>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 mb-2'>
              {section.label}
            </p>
            <div className='space-y-0.5'>
              {section.items.map((item) => {
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
            </div>
          </div>
        ))}
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
