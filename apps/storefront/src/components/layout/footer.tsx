'use client';

import Link from 'next/link';
import { ChevronUp } from 'lucide-react';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function Footer() {
  return (
    <footer className='bg-secondary text-foreground'>
      {/* Go to top */}
      <div className='border-b'>
        <button
          onClick={scrollToTop}
          className='w-full py-3 text-[13px] font-semibold text-center hover:bg-[#eaeaea] transition-colors flex items-center justify-center gap-1'
        >
          <ChevronUp className='h-4 w-4' />
          Back to top
        </button>
      </div>

      {/* Main footer */}
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8'>
          {/* Help & Contact */}
          <div>
            <h3 className='text-[13px] font-bold mb-4'>Help &amp; Contact</h3>
            <ul className='space-y-2'>
              {[
                { href: '/faq', label: 'FAQ & Help' },
                { href: '/contact', label: 'Contact us' },
                { href: '/account/orders', label: 'Order & delivery' },
                { href: '/returns', label: 'Returns' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-[13px] text-muted-foreground hover:text-foreground hover:underline transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className='text-[13px] font-bold mb-4'>About X-Plaza</h3>
            <ul className='space-y-2'>
              {[
                { href: '/about', label: 'About us' },
                { href: '/careers', label: 'Careers' },
                { href: '/press', label: 'Press' },
                { href: '/sustainability', label: 'Sustainability' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-[13px] text-muted-foreground hover:text-foreground hover:underline transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className='text-[13px] font-bold mb-4'>Shop</h3>
            <ul className='space-y-2'>
              {[
                { href: '/products?gender=women', label: 'Women' },
                { href: '/products?gender=men', label: 'Men' },
                { href: '/products?gender=kids', label: 'Kids' },
                { href: '/brands', label: 'Brands' },
                { href: '/shops', label: 'Shops' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-[13px] text-muted-foreground hover:text-foreground hover:underline transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us — social icons */}
          <div>
            <h3 className='text-[13px] font-bold mb-4'>Follow us</h3>
            <div className='flex items-center gap-3 mb-6'>
              {/* Facebook */}
              <a
                href='#'
                aria-label='Facebook'
                className='h-9 w-9 border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors'
              >
                <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href='#'
                aria-label='Instagram'
                className='h-9 w-9 border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors'
              >
                <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href='#'
                aria-label='Twitter'
                className='h-9 w-9 border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors'
              >
                <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </a>
            </div>
          </div>

          {/* App download */}
          <div>
            <h3 className='text-[13px] font-bold mb-4'>X-Plaza App</h3>
            <div className='space-y-2'>
              <a
                href='#'
                className='block border px-3 py-2 text-[12px] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors'
              >
                <span className='font-bold'>Download on the</span>
                <br />
                App Store
              </a>
              <a
                href='#'
                className='block border px-3 py-2 text-[12px] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors'
              >
                <span className='font-bold'>Get it on</span>
                <br />
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Delivery */}
      <div className='border-t border-border'>
        <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div className='flex items-center gap-4 flex-wrap'>
              <span className='text-[11px] font-bold uppercase tracking-wide text-muted-foreground'>
                Payment
              </span>
              {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((m) => (
                <span
                  key={m}
                  className='text-[11px] text-muted-foreground border border-border px-2 py-0.5'
                >
                  {m}
                </span>
              ))}
            </div>
            <div className='flex items-center gap-4 flex-wrap'>
              <span className='text-[11px] font-bold uppercase tracking-wide text-muted-foreground'>
                Delivery
              </span>
              {['DHL', 'UPS', 'DPD'].map((d) => (
                <span
                  key={d}
                  className='text-[11px] text-muted-foreground border border-border px-2 py-0.5'
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className='border-t border-border bg-[#eaeaea]'>
        <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-2'>
            <div className='flex items-center gap-4 flex-wrap'>
              <Link
                href='/imprint'
                className='text-[11px] text-muted-foreground hover:text-foreground hover:underline'
              >
                Imprint
              </Link>
              <Link
                href='/terms'
                className='text-[11px] text-muted-foreground hover:text-foreground hover:underline'
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href='/privacy'
                className='text-[11px] text-muted-foreground hover:text-foreground hover:underline'
              >
                Privacy Notice
              </Link>
              <Link
                href='/cookies'
                className='text-[11px] text-muted-foreground hover:text-foreground hover:underline'
              >
                Cookie Preferences
              </Link>
            </div>
            <p className='text-[11px] text-muted-foreground'>
              &copy; {new Date().getFullYear()} X-Plaza SE · All prices include
              VAT
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
