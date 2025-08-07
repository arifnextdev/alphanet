'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';

const ProtectedLayout = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  React.useEffect(() => {
    if (!authUser) {
      router.replace('/login');
    } else if (
      allowedRoles &&
      !authUser.roles?.some((role: string) => allowedRoles.includes(role))
    ) {
      router.replace('/forbidden');
    }
  }, [authUser, allowedRoles, router]);

  if (!authUser) {
    return null; // Or a loading spinner
  }

  if (
    allowedRoles &&
    !authUser.roles?.some((role: string) => allowedRoles.includes(role))
  ) {
    return <div className="text-center py-20 text-red-500">Access Denied</div>;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
