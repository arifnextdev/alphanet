'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLogoutMutation } from '@/lib/services/auth';
import { setAuth } from '@/lib/slices/authSlice';
import { RootState } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ChevronDown, Loader, LogOutIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModeToggle } from './themeToggole';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

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
  const authUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        router.push('/');
        dispatch(setAuth({ token: null, user: null }));
      });
  };

  return (
    <header className="bg-background/10 backdrop-blur border-b border-primary/20 shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          Alpha Net
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              <NavDropdown label="Hosting" href="/services/hosting" />
              <NavDropdown label="Domain" href="/services/domain" />
              <NavDropdown label="Email" href="/services/email" />
              <NavDropdown label="VPS" href="/services/vps" />
              <NavDropdown
                label="Dedicated Server"
                href="/services/dedicated-server"
              />
              <NavDropdown label="Cloud" href="/services/cloud" />
              <NavigationMenuItem>
                <Link href="/about" passHref legacyBehavior>
                  <NavigationMenuLink className="text-md font-medium text-foreground">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" passHref legacyBehavior>
                  <NavigationMenuLink className="text-md font-medium text-foreground">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {authUser ? (
                <>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${authUser.id}`}
                      passHref
                      legacyBehavior
                    >
                      <NavigationMenuLink className="text-md font-medium text-foreground">
                        <Avatar>
                          <AvatarImage src={authUser.avatar || ''} />
                          <AvatarFallback>
                            {authUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={handleLogout}
                      className="text-md font-medium text-foreground cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <LogOutIcon className='text-destructive '/>
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              ) : (
                <NavigationMenuItem>
                  <Link href="/auth/login" passHref legacyBehavior>
                    <NavigationMenuLink className="bg-primary   text-md font-medium text-white dark:text-foreground cursor-pointer">
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger aria-label="Open mobile menu">
              <MenuIcon className="w-6 h-6 text-primary" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] p-4 bg-background">
              <MobileMenu authUser={authUser} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavDropdown({ label, href }: { label: string; href: string }) {
  const router = useRouter();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="bg-transparent text-foreground text-md cursor-pointer"
        onClick={() => router.push(href)}
      >
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

function MobileMenu({ authUser }: { authUser: any }) {
  const items = [
    { label: 'Hosting' },
    { label: 'Domain' },
    { label: 'Email' },
    { label: 'VPS' },
    { label: 'Dedicated Server' },
    { label: 'Cloud' },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <MobileDropdown key={item.label} label={item.label} />
      ))}
      <div className="space-y-2 pt-4 border-t">
        <Link
          href="/about"
          className="block text-foreground hover:text-primary"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="block text-foreground hover:text-primary"
        >
          Contact
        </Link>

        {authUser ? (
          <>
            <Avatar>
              <AvatarImage src={authUser.avatar} />
              <AvatarFallback>{authUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Link
              href="/auth/logout"
              className="block text-foreground hover:text-primary"
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="block text-foreground hover:text-primary"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

function MobileDropdown({ label }: { label: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-b pb-2">
      <div
        className="font-semibold text-foreground mb-2 flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <ul className="space-y-2">
          {components.map((component) => (
            <li key={component.title}>
              <Link
                href={component.href}
                className="text-sm text-muted-foreground block hover:text-primary"
              >
                {component.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
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
