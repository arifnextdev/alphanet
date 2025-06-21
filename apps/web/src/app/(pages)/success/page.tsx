'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const payID = searchParams.get('payID');
  const token = searchParams.get('token'); // secret-like token to restrict access

  // redirect if token missing (page should only be accessible via redirect with token)
  useEffect(() => {
    if (!token) {
      router.replace('/'); // or to /error page
    }
  }, [token, router]);

  // optional: handle loading before redirect happens
  if (!token) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-md p-6 rounded-2xl border shadow-lg bg-card text-card-foreground">
        <div className="flex flex-col items-center space-y-4 text-center">
          <CheckCircle className="w-12 h-12 text-green-500" />
          <h1 className="text-2xl font-bold">Payment Successful</h1>
          <p className="text-muted-foreground">
            Your order has been placed successfully.
          </p>
          <p className="text-sm text-green-700 dark:text-green-400">
            Payment ID: {payID || 'N/A'}
          </p>
          <Link href="/dashboard">
            <Button className="mt-4">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
