'use client';

import { Button } from '@/components/ui/button';
import { IProduct, useGetProductsQuery } from '@/lib/services/productsApi';
import Link from 'next/link';

export default function EmailServicePage() {
  const { data, isLoading } = useGetProductsQuery({
    limit: 3,
    status: 'ACTIVE',
    type: 'EMAIL',
  });

  return (
    <div className="mt-20">
      <section className="py-24 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-bl from-primary/70 via-primary to-primary/70 bg-clip-text text-transparent">
          Professional Email Hosting
        </h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Get a professional email address with your own domain.
        </p>
        <Button>Get Started</Button>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Email Hosting Plans
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <p className="text-center col-span-full">Loading plans...</p>
          ) : (
            data?.products.map((product: IProduct) => (
              <div
                key={product.id}
                className="border border-primary/20 p-6 rounded-xl text-center shadow-md hover:shadow-blue-500/30 transition"
              >
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-sm mb-4">{product.description}</p>
                <p className="text-3xl font-bold mb-4">${product.price}</p>
                <Link href={`/services/checkout?product=${product.id}`}>
                  <Button className="w-full">Choose Plan</Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
