import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Providers } from '@/components/providers';
import { ServiceWorkerRegistrar } from '@/components/service-worker-registrar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'X-Plaza | Multi-Vendor Marketplace',
    template: '%s | X-Plaza',
  },
  description:
    'Shop quality products from trusted sellers on X-Plaza, your multi-vendor marketplace.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    siteName: 'X-Plaza',
    title: 'X-Plaza | Multi-Vendor Marketplace',
    description:
      'Shop quality products from trusted sellers on X-Plaza.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icons/icon-192x192.png' />
      </head>
      <body className='min-h-screen flex flex-col'>
        <Providers>
          <ServiceWorkerRegistrar />
          <a href='#main-content' className='skip-link'>
            Skip to main content
          </a>
          <Header />
          <main id='main-content' className='flex-1'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
