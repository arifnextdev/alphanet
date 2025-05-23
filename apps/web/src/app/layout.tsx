import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Providers } from './providers';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 relative`}
      >
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Header />
            <main className="w-full h-[calc(100vh-100px)]">{children}</main>
          </ThemeProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
