import Footer from '@/components/Footer';

import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import '@/app/globals.css';
import { Providers } from '../providers';
import Header from '@/components/Header';



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
      <ThemeProvider attribute="class" defaultTheme="system">
        <Header />
        <main className="w-full ">{children}</main>
        <Footer />
      </ThemeProvider>
    </Providers>
  );
}
