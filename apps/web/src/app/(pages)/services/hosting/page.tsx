'use client';

import Hero from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';
import { totalPrice } from '@/lib/calculate';
import { IProduct, useGetProductsQuery } from '@/lib/services/productsApi';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';



export default function HostingServicePage() {
  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 10,
    type: 'HOSTING',
    status: 'ACTIVE',
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Do you provide free domain registration?',
      answer: 'Yes, annual plans include a free domain for the first year.',
    },
    {
      question: 'Is email hosting included?',
      answer: 'Yes, every plan comes with professional email accounts.',
    },
    {
      question: 'Can I upgrade my VPS plan anytime?',
      answer: 'Absolutely! You can scale your plan anytime as your needs grow.',
    },
    {
      question: 'Do you offer customer support 24/7?',
      answer: 'Yes, our support team is available 24/7 via live chat & ticket.',
    },
  ];

  return (
    <div className="">
      <Hero>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Globe Icon */}

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold dark:text-white z-10 leading-tight text-center">
            Affordable & Fast
            <span className="text-blue-500">Web Hosting</span>
            <br />
            <span className="text-purple-400">Solutions</span> for Your Business
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-300 mt-4 z-10 max-w-lg text-center">
            Secure, high-performance hosting tailored for businesses, developers
            & creators.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 z-10">
            <Button variant="default" size="lg" className="mt-6">
              <Link href="#plans">Explore Hosting Plans</Link>
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

      {/* SEO Section */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white mb-6 tracking-tight">
          Blazing Fast Hosting with&apos;
          <span className="text-blue-600">99.99% Uptime</span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Experience lightning-fast performance powered by&apos;
          <strong className="text-gray-900 dark:text-white">
            NVMe SSD storage
          </strong>
          ,
          <strong className="text-gray-900 dark:text-white">
            &apos; LiteSpeed web servers
          </strong>
          , and a global
          <strong className="text-gray-900 dark:text-white">
            &apos; CDN network
          </strong>
          . Perfect for eCommerce, blogs, agencies, and SaaS startups aiming to
          scale quickly without compromising on cost or performance.
        </p>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto bg-secondary/10 dark:bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white">
            Powerful Features to Elevate Your Hosting
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Explore our robust feature set designed to provide secure,
            high-performance web and VPS hosting solutions globally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Global CDN',
              desc: 'Deliver your website content at lightning speed anywhere in the world using our enterprise-grade Content Delivery Network.',
              icon: '🌐',
            },
            {
              title: 'One-Click Apps',
              desc: 'Launch applications like WordPress, Joomla, and Drupal instantly with our one-click installer. Get started in seconds.',
              icon: '⚡',
            },
            {
              title: 'Free SSL & Backups',
              desc: 'Secure your site with free SSL certificates and automated daily backups to restore data effortlessly.',
              icon: '🔒',
            },
          ].map(({ title, desc, icon }, i) => (
            <div
              key={i}
              className="relative rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm shadow-primary/60 hover:shadow-lg transition-all duration-300 group border-2 border-transparent hover:border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-pointer hove:border-primary"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{desc}</p>

              {/* Decorative gradient border on hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pointer-events-none transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="max-w-5xl mx-auto py-20 px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-primary dark:text-white">
          Hosting Plans
        </h2>
        <hr className="w-1/3 mx-auto border border-primary dark:border-white mb-5 lg:mb-10 mt-3" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p className="col-span-full text-center">Loading plans...</p>
          ) : (
            data?.products &&
            data.products.map((plan: IProduct) => {
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
                    <p className="font-medium">What&apos;s included:</p>
                    {plan.description
                      .split('\n')
                      .map((item: string, idx: number) => (
                        <p key={idx}>• {item}</p>
                      ))}
                  </div>

                  <Link href={`/services/checkout/${plan.id}`}>
                    <Button
                      className={`w-full ${
                        isPopular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : ''
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

      {/* Use Cases */}
      <section className="bg-white dark:bg-gray-900 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Perfect For Every Project
          </h2>
          <p className="mb-10 text-gray-600 dark:text-gray-400">
            Whether you&apos;re launching a store, building client websites, or
            running a SaaS product, our hosting solutions scale with you.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: 'E-Commerce Sites',
                desc: 'Fast and secure hosting for Shopify, WooCommerce, Magento & more.',
                icon: '🛒',
              },
              {
                title: 'Agencies & Freelancers',
                desc: 'Host multiple client sites with powerful tools and white-label options.',
                icon: '🧑‍💻',
              },
              {
                title: 'Startups & SaaS',
                desc: 'Scalable infrastructure designed to grow with your product and users.',
                icon: '🚀',
              },
            ].map(({ title, desc, icon }, i) => (
              <div
                key={i}
                className="relative group bg-secondary/10 dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:border-2"
              >
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {desc}
                </p>

                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pointer-events-none transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 mb-6">
            Trusted by startups & businesses globally
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['logo1.png', 'logo2.png', 'logo3.png', 'logo4.png'].map(
              (src, i) => (
                <Image
                  key={i}
                  src={`/images/logos/${src}`}
                  alt="Logo"
                  width={100}
                  height={60}
                />
              ),
            )}
          </div>
        </div>
      </section>

      {/* Blog Resources */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-6">
            Resources & Hosting Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Expert-written articles to help you get the most out of your hosting
            experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: 'How to Choose the Right Hosting Plan',
                link: '/blog/choose-hosting-plan',
              },
              {
                title: 'Securing Your Website in 2025',
                link: '/blog/security-basics',
              },
              {
                title: 'Top 5 CMS for Fast Deployment',
                link: '/blog/top-cms-2025',
              },
            ].map((post, i) => (
              <div
                key={i}
                className="relative group bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md border border-transparent hover:border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:border-2 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-3 group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h3>
                <Link
                  href={post.link}
                  className="inline-block text-sm text-primary hover:underline font-medium"
                  aria-label={`Read more: ${post.title}`}
                >
                  Read More →
                </Link>

                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pointer-events-none transition-all duration-300" />
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
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full text-left font-semibold text-lg cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                {faq.question}
              </button>
              {activeFaq === i && (
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              )}
              <hr className="mt-4" />
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Launch Your Website Today</h2>
        <p className="text-lg mb-6">
          Simple, scalable, and secure web hosting for everyone. Start in
          minutes!
        </p>
        <Link
          href="#plans"
          className="bg-white text-primary font-semibold px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition"
        >
          View Hosting Plans
        </Link>
      </section>
    </div>
  );
}
