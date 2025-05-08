'use client';

import { useMeQuery } from '@/lib/services/auth';
import { setAuth } from '@/lib/slices/authSlice';
import { LoaderCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function OAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const token = searchParams.get('token') || '';

  const {
    data: user,
    isError,
    isSuccess,
  } = useMeQuery({ token }, { skip: !token });

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
      toast.error('Something went wrong');
      return;
    }

    if (isSuccess && user) {
      console.log('encodedUser', user);
      dispatch(setAuth({ token, user }));
      router.push('/admin/dashboard');
      toast.success('Logged in successfully');
    } else if (isError) {
      router.push('/auth/login');
      toast.error('Authentication failed');
    }
  }, [token, isSuccess, isError, user, dispatch, router]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
