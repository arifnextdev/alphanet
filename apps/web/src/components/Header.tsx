'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

const components = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description: 'A popup that displays information when hovered or focused.',
  },
];

export function Header() {
  return (
    <div className="bg-accent-foreground/60 border-b border-primary/20 shadow-sm fixed w-full top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          Alpha Net
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              <NavDropdown label="Hosting" />
              <NavDropdown label="Domain" />
              <NavDropdown label="Email" />
              <NavDropdown label="VPS" />
              <NavDropdown label="Dedicated Server" />
              <NavDropdown label="Cloud" />

              <NavigationMenuItem>
                <Link href="/about" passHref legacyBehavior>
                  <NavigationMenuLink className="text-md font-medium text-primary">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" passHref legacyBehavior>
                  <NavigationMenuLink className="text-md font-medium text-primary">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/login" passHref legacyBehavior>
                  <NavigationMenuLink className="font-medium bg-primary text-white px-4 py-2 rounded">
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger aria-label="Open mobile menu">
              <MenuIcon className="w-6 h-6 text-primary" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] p-4 bg-white">
              <div className="space-y-4">
                {[
                  'Hosting',
                  'Domain',
                  'Email',
                  'VPS',
                  'Dedicated Server',
                  'Cloud',
                ].map((section) => (
                  <MobileDropdown key={section} label={section} />
                ))}
                <div className="space-y-2 pt-4 border-t">
                  <Link
                    href="/about"
                    className="block text-gray-700 hover:text-primary"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-gray-700 hover:text-primary"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/login"
                    className="block font-medium bg-primary text-white px-4 py-2 rounded w-fit"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

function NavDropdown({ label }: { label: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent text-primary text-md">
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {components.map((component) => (
            <ListItem
              key={component.title}
              title={component.title}
              href={component.href}
            >
              {component.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function MobileDropdown({ label }: { label: string }) {
  return (
    <div>
      <div className="font-semibold text-gray-800 mb-2">{label}</div>
      <ul className="space-y-2">
        {components.map((component) => (
          <li key={component.title}>
            <Link
              href={component.href}
              className="text-sm text-gray-600 block hover:text-primary"
            >
              {component.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
