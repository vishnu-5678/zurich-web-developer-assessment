import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { StoreProvider } from '@/lib/store/provider';
import './globals.css';
import './page.css';

export const metadata: Metadata = {
  title: 'Zurich Customer Portal',
  description: 'Zurich Web Developer Assessment',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <StoreProvider>{children}</StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
