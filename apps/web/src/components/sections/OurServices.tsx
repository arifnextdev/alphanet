'use client';

import { useGetProductsQuery } from '@/lib/services/productsApi';
import SectionTitle from '../global/SectionTitle';
import { Button } from '../ui/button';
import { totalPrice } from '@/lib/calculate';

const OurServices = () => {
  const { data, isLoading, isError } = useGetProductsQuery({
    page: 1,
    limit: 10,
    status: 'ACTIVE',
  });

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <SectionTitle
          title="Our Services"
          desc="Explore our powerful tools that help you grow your online presence."
        />
      </div>
      <div className="max-w-6xl mx-auto px-4  sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="col-span-full text-center">Loading plans...</p>
        ) : (
          data?.products &&
          data.products.map((plan, index) => {
            const isPopular = plan.grade === 'PREMIUM';
            return (
              <div
                key={plan.id}
                className={`relative border rounded-2xl p-6 shadow-md transition-all hover:shadow-lg text-center ${
                  isPopular
                    ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-950'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                }`}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                    MOST POPULAR!
                  </div>
                )}

                {/* Plan Name */}
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isPopular
                      ? 'text-blue-700 dark:text-white'
                      : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {plan.name}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  For those with small but consistent usage.
                </p>

                {/* Price */}
                <div className="flex justify-center items-end mb-4">
                  <span className="mr-1 text-gray-600 dark:text-gray-400 line-through">
                    {plan.price}
                  </span>
                  <span className="text-4xl font-bold text-primary dark:text-blue-400">
                    ৳{totalPrice(plan.price, plan.discount)}
                  </span>
                  <span className="ml-1 text-gray-600 dark:text-gray-400 font-medium">
                    {plan.billingCycle === 'MONTHLY' ? '/mo' : '/yr'}
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  per month, per user.
                </p>

                {/* Features */}
                <div className="text-left text-sm mb-6 text-gray-700 dark:text-gray-200 space-y-2">
                  <p className="font-medium">What's included:</p>
                  {plan.description.split('\n').map((item, idx) => (
                    <p key={idx}>• {item}</p>
                  ))}
                </div>

                {/* Button */}
                <Button
                  className={`w-full ${
                    isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
                  }`}
                  variant={isPopular ? 'default' : 'outline'}
                >
                  Get Started
                </Button>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-12 text-center">
        <Button variant="default">Explore All Services</Button>
      </div>
    </section>
  );
};

export default OurServices;
