import './globals.css';
import { Providers } from './providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fluidity',
  description: 'Built with <3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-black`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
