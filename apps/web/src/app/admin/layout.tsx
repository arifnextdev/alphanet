import '@/app/globals.css';
import type { Metadata } from 'next';
import Header from './_components/sidebar';
import { Providers } from '../providers';

export const metadata: Metadata = {
  title: 'Alpha Net',
  description: 'Alpha Net - Your Ultimate Hosting Solution',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex">
        <Header />
        <main className="flex-1 p-6 min-h-screen pt-10 overflow-hidden">
          {children}
        </main>
      </div>
    </Providers>
  );
}
