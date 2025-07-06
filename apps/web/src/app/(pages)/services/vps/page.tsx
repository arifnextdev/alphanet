'use client';

import Hero from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';
import { totalPrice } from '@/lib/calculate';
import { useGetProductsQuery } from '@/lib/services/productsApi';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function VpsServicePage() {
  const { data, isLoading, isError } = useGetProductsQuery({
    page: 1,
    limit: 10,
    type: 'VPS',
    status: 'ACTIVE',
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const authUser = useSelector((state: RootState) => state.auth.user);

  return (
    <div className=" ">
      <Hero>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Globe Icon */}

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold dark:text-white z-10 leading-tight text-center">
            Scalable & Secure
            <span className="text-blue-500">VPS Hosting</span>
            <br />
            <span className="text-purple-400">For Developers</span> & Creators
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-300 mt-4 z-10 max-w-lg text-center">
            Lightning-fast VPS solutions optimized for performance, security &
            scalability.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 z-10">
            <Button variant="default" size="lg" className="mt-6">
              <Link href="#plans">Explore Plans</Link>
            </Button>
          </div>
          <div className="absolute bottom-20 left-24 animate-bounce hidden md:block">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
              💬
            </span>
          </div>
          <div className="absolute top-32 right-24 animate-pulse hidden md:block">
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
              🛒
            </span>
          </div>
        </div>
      </Hero>

      <section id="plans" className="max-w-5xl mx-auto py-20 px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-primary dark:text-white">
          VPS Plans
        </h2>
        <hr className="w-1/3 mx-auto border border-primary dark:border-white mb-5 lg:mb-10 mt-3" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

                  <Link href={`/services/checkout/${plan.id}`}>
                    <Button
                      className={`w-full ${
                        isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
                      }`}
                      variant={isPopular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-secondary/70">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Our VPS</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              '99.99% Uptime Guarantee',
              'NVMe SSDs for blazing speed',
              'Scalable Resources On Demand',
              'Full Root Access & Custom OS',
              '24/7 Expert Support',
              'Automated Backups & Snapshots',
            ].map((feature, i) => (
              <li
                key={i}
                className="bg-primary p-4 rounded-lg shadow text-white"
              >
                ✅ {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-2 gap-12 items-center">
        <Image
          src="/images/vps/banner.jpg"
          alt="About Us"
          width={600}
          height={400}
          className="rounded-xl border border-primary/20 shadow-sm shadow-primary mb-6 md:mb-0 "
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Backed by Industry Experts
          </h2>
          <p className="mb-6">
            Our infrastructure is built by veterans of cloud computing, ensuring
            stability and unmatched performance across the globe.
          </p>
          <Button>Learn More</Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Client Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Anika Roy',
                quote:
                  'The best hosting experience I’ve had. Performance is excellent and support is always responsive.',
                avatar: '/images/vps/testi1.jpg',
              },
              {
                name: 'James Adler',
                quote:
                  'Reliable and blazing fast. Highly recommended for developers and SaaS businesses.',
                avatar: '/images/vps/testi2.jpg',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-xl shadow-md text-left bg-primary/20"
              >
                <p className="italic mb-4">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-primary "
                  />
                  <span className="font-semibold">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              question: 'Can I upgrade my VPS later?',
              answer:
                'Yes, you can upgrade your plan anytime via the control panel.',
            },
            {
              question: 'Is DDoS protection included?',
              answer: 'All plans come with free basic DDoS protection.',
            },
            {
              question: 'Do you provide root access?',
              answer: 'Yes, full root access is included with every VPS.',
            },
            {
              question: 'Which OS templates do you support?',
              answer:
                'We support Ubuntu, CentOS, Debian, AlmaLinux and custom ISOs.',
            },
          ].map((faq, i) => (
            <div key={i}>
              <button
                className="w-full text-left font-semibold text-lg cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                {faq.question}
              </button>
              {activeFaq === i && <p className="mt-2">{faq.answer}</p>}
              <hr className="mt-4" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-primary py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Launch Your VPS Today</h2>
        <p className="text-lg mb-6">
          Choose a plan, deploy in minutes, and scale on-demand.
        </p>
        <Link
          href="/services/vps"
          className={`bg-white border-2 border-transparent text-primary font-semibold px-6 py-2 rounded-lg inline-block hover:bg-primary hover:text-white hover:border-secondary-foreground transition`}
        >
          View Plans
        </Link>
      </section>
    </div>
  );
}
