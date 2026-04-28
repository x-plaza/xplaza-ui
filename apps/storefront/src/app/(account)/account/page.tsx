import Link from 'next/link';
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

const QUICK_LINKS = [
  {
    label: 'Orders',
    description: 'Track, return or buy again',
    href: '/account/orders',
    icon: Package,
  },
  {
    label: 'Wishlist',
    description: 'Items you saved',
    href: '/account/wishlists',
    icon: Heart,
  },
  {
    label: 'Addresses',
    description: 'Manage delivery addresses',
    href: '/account/addresses',
    icon: MapPin,
  },
  {
    label: 'Payment',
    description: 'Saved payment methods',
    href: '/account/payment-methods',
    icon: CreditCard,
  },
];

export default function AccountPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Hi there!</h1>
      <p className='text-muted-foreground mt-1'>
        Welcome to your account dashboard.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8'>
        {QUICK_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className='group flex items-center gap-4 border p-5 hover:border-foreground/30 transition-colors'
            >
              <Icon className='h-6 w-6 flex-shrink-0' />
              <div className='flex-1 min-w-0'>
                <p className='text-[14px] font-bold'>{link.label}</p>
                <p className='text-[13px] text-muted-foreground'>
                  {link.description}
                </p>
              </div>
              <ArrowRight className='h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors' />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
