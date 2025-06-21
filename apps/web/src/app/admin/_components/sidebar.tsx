'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  GiftIcon,
  LayoutDashboard,
  ListOrderedIcon,
  Package,
  Settings,
  Users,
  Wallet,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Transections', href: '/admin/dashboard/transection', icon: Wallet },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ListOrderedIcon },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Cuppons', href: '/admin/cuppons', icon: GiftIcon },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background px-4 py-6 shadow-sm  ">
      <div className="text-xl font-bold px-2 mb-6">Admin Panel</div>
      <nav className="space-y-2">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
              pathname === href
                ? 'bg-muted text-primary'
                : 'text-muted-foreground',
            )}
          >
            <Icon className="h-4 w-4" />
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
