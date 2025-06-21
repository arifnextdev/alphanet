'use client';

import Invoice from '@/components/customs/Invoice';
import { useGetPaymentByIdQuery } from '@/lib/services/payment';
import { use } from 'react';

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data, isLoading: loading } = useGetPaymentByIdQuery(slug as string);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Order not found.</p>;

  return (
    <div className="">
      <Invoice data={data} />
    </div>
  );
}
