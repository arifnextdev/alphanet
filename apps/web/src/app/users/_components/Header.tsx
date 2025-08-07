'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  return (
    <header className="border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-4 lg:px-6">
        {/* alwas have a back button */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 "
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Profile Settings</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 ">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={'/placeholder.svg'} />
                  <AvatarFallback className="bg-blue-600">
                    {/* {customerProfile.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')} */}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-gray-800 border-gray-700"
            >
              <DropdownMenuLabel className="text-gray-200">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-700 text-gray-200">
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 text-gray-200">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-700 text-gray-200">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
