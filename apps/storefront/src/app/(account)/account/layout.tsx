'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Shield,
  Bell,
  LogOut,
} from 'lucide-react';
import { cn } from '@xplaza/utils';

const ACCOUNT_NAV = [
  { label: 'Overview', href: '/account', icon: User, exact: true },
  { label: 'Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/account/wishlists', icon: Heart },
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Payment Methods', href: '/account/payment-methods', icon: CreditCard },
  { label: 'Security & Privacy', href: '/account/security', icon: Shield },
  { label: 'Notifications', href: '/account/notifications', icon: Bell },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-8'>
      <div className='flex gap-10'>
        {/* Desktop sidebar */}
        <aside className='hidden lg:block w-56 flex-shrink-0'>
          <h2 className='text-lg font-bold mb-4'>My Account</h2>
          <nav className='space-y-0.5'>
            {ACCOUNT_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 text-[13px] transition-colors',
                    isActive
                      ? 'font-bold text-foreground bg-secondary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  )}
                >
                  <Icon className='h-4 w-4' />
                  {item.label}
                </Link>
              );
            })}
            <button className='flex items-center gap-3 px-3 py-2.5 text-[13px] text-muted-foreground hover:text-foreground w-full text-left mt-4 border-t pt-4'>
              <LogOut className='h-4 w-4' />
              Sign out
            </button>
          </nav>
        </aside>

        {/* Mobile horizontal tabs */}
        <div className='lg:hidden w-full'>
          <nav className='flex overflow-x-auto gap-0 border-b mb-6 -mx-4 px-4'>
            {ACCOUNT_NAV.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex-shrink-0 px-4 py-3 text-[13px] border-b-2 transition-colors',
                    isActive
                      ? 'font-bold text-foreground border-foreground'
                      : 'text-muted-foreground border-transparent'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0 lg:block hidden'>{children}</div>
      </div>
      {/* Mobile content (outside flex) */}
      <div className='lg:hidden'>{children}</div>
    </div>
  );
}
