import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
  description: 'Bangladesh’s premier hosting provider.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Alpha Net',
    description: 'Bangladesh’s premier hosting provider.',
    url: 'https://alpha.net.bd',
    siteName: 'Alpha Net',
    images: [
      {
        url: 'https://alpha.net.bd/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpha Net',
    description: 'Bangladesh’s premier hosting provider.',
    images: ['https://alpha.net.bd/og-image.png'],
    creator: '@alpha_net',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    noimageindex: false,
    nosnippet: false,
    notranslate: false,
  },
  verification: {
    google: 'google-site-verification=your-google-verification-code',
    yandex: 'yandex-verification: your-yandex-verification-code',
    other: {
      Bing: 'your-bing-verification-code',
      Pinterest: 'your-pinterest-verification-code',
    },
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Alpha Net',
    startupImage: [
      {
        media: 'width >= 768',
        url: '/apple-touch-startup-image-768x1004.png',
      },
      {
        media: 'width < 768',
        url: '/apple-touch-startup-image-640x1136.png',
      },
    ],
  },
  viewport: {
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white/80 text-black/80 dark:bg-black/80 dark:text-white/80 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
