import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about X-Plaza, the multi-vendor marketplace.',
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold mb-8'>About X-Plaza</h1>

      <div className='prose prose-lg max-w-none space-y-6'>
        <p className='text-lg text-muted-foreground'>
          X-Plaza is a multi-vendor marketplace connecting quality sellers with
          discerning shoppers. We make it easy to discover, compare, and purchase
          products from trusted vendors — all in one place.
        </p>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
          <p className='text-muted-foreground'>
            To create a fair, transparent marketplace where independent sellers
            thrive and customers find exactly what they need at competitive
            prices.
          </p>
        </section>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold mb-4'>Why X-Plaza?</h2>
          <ul className='space-y-3 text-muted-foreground'>
            <li className='flex items-start gap-2'>
              <span className='font-semibold text-foreground'>Trusted Sellers</span> —
              Every vendor is verified before joining the platform.
            </li>
            <li className='flex items-start gap-2'>
              <span className='font-semibold text-foreground'>Secure Payments</span> —
              PCI-compliant checkout powered by Stripe.
            </li>
            <li className='flex items-start gap-2'>
              <span className='font-semibold text-foreground'>Buyer Protection</span> —
              Full refund policy and order tracking on every purchase.
            </li>
            <li className='flex items-start gap-2'>
              <span className='font-semibold text-foreground'>Loyalty Rewards</span> —
              Earn points on every order and redeem for discounts.
            </li>
          </ul>
        </section>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold mb-4'>Contact</h2>
          <p className='text-muted-foreground'>
            Have questions? Reach out to us at{' '}
            <a
              href='mailto:support@xplaza.com'
              className='text-primary hover:underline'
            >
              support@xplaza.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
