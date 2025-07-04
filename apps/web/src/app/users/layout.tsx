import '@/app/globals.css';
import type { Metadata } from 'next';
import Header from './_components/Header';
import { Providers } from '../providers';

export const metadata: Metadata = {
  title: 'Alpha Net',
  description: 'Alpha Net - Your Ultimate Hosting Solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Header />
      <div className="w-full container mx-auto">{children}</div>
    </Providers>
  );
}
