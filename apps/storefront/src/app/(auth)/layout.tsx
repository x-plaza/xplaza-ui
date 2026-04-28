import '@/styles/globals.css';
import { Providers } from '@/components/providers';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className='min-h-screen flex flex-col items-center justify-center bg-background'>
        {children}
      </div>
    </Providers>
  );
}
