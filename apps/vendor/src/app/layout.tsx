import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: {
    template: '%s | X-Plaza Vendor',
    default: 'X-Plaza Vendor Dashboard',
  },
  description: 'Manage your X-Plaza vendor shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='font-sans'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
