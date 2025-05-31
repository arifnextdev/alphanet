'use client';

import { Button } from '@/components/ui/button';
import { IProduct, useGetProductsQuery } from '@/lib/services/productsApi';
import Image from 'next/image';
import { useState } from 'react';

export default function HostingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Fetch 3 hosting products
  const { data, isLoading } = useGetProductsQuery({
    limit: 3,
    status: 'ACTIVE',
    type: 'HOSTING',
  });

  const features = [
    '99.9% Uptime Guarantee',
    'Free SSL Certificate',
    '1-Click WordPress Installation',
    '24/7 Expert Support',
    'Unlimited Bandwidth',
    'Free Domain for 1st Year',
  ];

  const faqs = [
    {
      question: 'What is web hosting?',
      answer:
        'Web hosting is a service that allows your website to be accessible via the internet.',
    },
    {
      question: 'Can I upgrade my hosting plan later?',
      answer: 'Yes, you can upgrade your plan anytime from your dashboard.',
    },
    {
      question: 'Do you provide support?',
      answer:
        'Absolutely! We offer 24/7 customer support to assist with all your needs.',
    },
  ];

  const testimonials = [
    {
      name: 'Jane Doe',
      quote:
        'I’ve tried many hosts before, but this one offers the best uptime and performance!',
      avatar: '/avatars/user1.jpg',
    },
    {
      name: 'John Smith',
      quote:
        'Super fast support and very reliable service. Highly recommend to anyone.',
      avatar: '/avatars/user2.jpg',
    },
  ];

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="py-24 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-bl from-primary/70 via-primary to-primary/70 bg-clip-text text-transparent">
          Power Your Website with Fast & Secure Hosting
        </h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Get started with blazing fast web hosting designed for performance and
          scalability.
        </p>
        <Button>Get Started</Button>
      </section>

      {/* Hosting Plans */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Web Hosting Plans
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
                <Button className="w-full">Choose Plan</Button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Hosting Features */}
      <section className="py-20 px-4 bg-secondary/70">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Hosting Features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {features.map((feature, i) => (
              <li
                key={i}
                className="bg-primary text-white p-4 rounded-lg shadow transition"
              >
                ✅ {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-2 gap-12 items-center">
        <Image
          src="/images/hosting-dashboard.png"
          alt="Hosting Dashboard"
          width={600}
          height={400}
          className="rounded-xl border border-primary/20 shadow-sm shadow-primary mb-6 md:mb-0"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Hosting?</h2>
          <p className="mb-6">
            Our infrastructure is built on top-tier data centers to deliver
            unmatched performance, security, and reliability. With 24/7 support
            and a user-friendly dashboard, we make hosting easy for everyone.
          </p>
          <Button>Learn More</Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Client Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-xl shadow-md text-left bg-white"
              >
                <p className="italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full"
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
        <h2 className="text-3xl font-semibold mb-10 text-center">FAQs</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
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
        <h2 className="text-3xl font-bold mb-4">
          Start Hosting with Confidence
        </h2>
        <p className="text-lg mb-6">
          Join thousands of satisfied customers today!
        </p>
        <Button variant="outline" className="text-primary dark:bg-white">
          Get Your Hosting Plan
        </Button>
      </section>
    </div>
  );
}
