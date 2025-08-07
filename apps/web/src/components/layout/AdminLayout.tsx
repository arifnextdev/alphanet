'use client';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const AdminLayouts = ({ children }: { children: React.ReactNode }) => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  React.useEffect(() => {
    if (
      !authUser ||
      !authUser.roles?.some((role: string) =>
        ['ADMIN', 'MODERATOR'].includes(role),
      )
    ) {
      toast.error('You do not have permission to access this page.');
      router.replace('/'); // Use replace for navigation
    }
  }, [authUser, router]);

  // Optionally show a loading spinner if authUser is undefined/null
  if (!authUser) {
    return null; // Or a spinner
  }

  if (
    !authUser.roles?.some((role: string) =>
      ['ADMIN', 'MODERATOR'].includes(role),
    )
  ) {
    return null; // Prevent rendering children while redirecting
  }

  return <div>{children}</div>;
};

export default AdminLayouts;
