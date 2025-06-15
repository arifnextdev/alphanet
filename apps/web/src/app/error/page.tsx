'use client';

import { useSearchParams } from 'next/navigation';
import { AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const payID = searchParams.get('payID');

  const isCancelled = message === 'cancel' || (message === 'failure' && payID);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-md p-6 rounded-2xl border shadow-lg bg-card text-card-foreground">
        <div className="flex flex-col items-center space-y-4 text-center">
          {isCancelled ? (
            <>
              <XCircle className="w-12 h-12 text-red-500" />
              <h1 className="text-2xl font-bold">Payment Cancelled</h1>
              <p className="text-muted-foreground">
                Your order could not be completed.
              </p>
              <p className="text-sm text-destructive/70">Payment ID: {payID}</p>
              <Link href="/">
                <Button variant="default" className="mt-4">
                  Try Again
                </Button>
              </Link>
            </>
          ) : (
            <>
              <AlertTriangle className="w-12 h-12 text-yellow-500" />
              <h1 className="text-2xl font-bold">Something went wrong</h1>
              <p className="text-muted-foreground">Please try again later.</p>
              <Link href="/">
                <Button variant="outline" className="mt-4">
                  Go Home
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
