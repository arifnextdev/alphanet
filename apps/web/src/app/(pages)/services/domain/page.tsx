'use client';

import Hero from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DomainServicePage() {
  const [domain, setDomain] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkDomain = async () => {
    if (!domain) return;

    setIsLoading(true);
    setIsAvailable(null);

    toast.promise(
      fetch(`/api/domain/check?name=${domain}`).then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to check domain');
        }
        const data = await res.json();
        if (data.DomainInfo.domainAvailability === 'AVAILABLE') {
          setIsAvailable(true);
          return 'Domain is available!';
        } else {
          setIsAvailable(false);
          throw new Error('Domain is not available');
        }
      }),
      {
        loading: 'Checking domain...',
        success: (message) => message,
        error: (err) => err.message,
      },
    );

    setIsLoading(false);
  };

  const pricing = [
    { tld: '.com', price: 950 },
    { tld: '.net', price: 1100 },
    { tld: '.org', price: 900 },
    { tld: '.info', price: 850 },
    { tld: '.xyz', price: 500 },
  ];

  return (
    <div className="">
      <Hero>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Globe Icon */}

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold dark:text-white z-10 leading-tight text-center">
            Find & Buy Your
            <span className="text-blue-500">Perfect Domain</span>
            <br />
            <span className="text-purple-400">Instantly</span> & Securely
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-300 mt-4 z-10 max-w-xl text-center">
            Search and register domain names in seconds. Secure your online
            identity today.
          </p>

          {/* Domain Search Input */}
          <div className="mt-6 flex items-center justify-center gap-2 z-10 w-full max-w-lg">
            <Input
              type="text"
              placeholder="e.g. mycooldomain.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1"
            />
            <Button onClick={checkDomain} disabled={isLoading}>
              {isLoading ? 'Checking...' : 'Search'}
            </Button>
          </div>

          {/* Availability Message */}
          {isAvailable !== null && (
            <div className="mt-4 text-lg font-semibold z-10">
              {isAvailable ? (
                <div className="flex items-center gap-4">
                  <span className="text-green-500">🎉 Domain is available!</span>
                  <Link href={`/services/checkout?domain=${domain}`}>
                    <Button>Buy Now</Button>
                  </Link>
                </div>
              ) : (
                <span className="text-red-500">❌ Domain is taken.</span>
              )}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 z-10">
            <Button variant="default" size="lg">
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-500 text-white"
            >
              How it Works?
            </Button>
          </div>
          <div className="absolute bottom-20 left-24 animate-bounce hidden md:block">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
              💬 Evren is searching
            </span>
          </div>
          <div className="absolute top-32 right-24 animate-pulse hidden md:block">
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
              🛒 Tatiana just bought .store
            </span>
          </div>
        </div>
      </Hero>

      {/* Pricing Table */}
      <section className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Domain Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pricing.map(({ tld, price }) => (
            <div
              key={tld}
              className="p-6 border rounded-xl text-center shadow dark:bg-gray-900 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold">{tld}</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                Annual Price
              </p>
              <p className="text-3xl font-bold mb-4 text-primary">৳{price}</p>
              <Button>Register Now</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="bg-secondary/10 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left text-sm text-gray-700 dark:text-gray-200">
            {[
              'Competitive domain pricing',
              'Free WHOIS privacy protection',
              'Fast & secure domain registration',
              '24/7 expert support',
              'Easy DNS management',
              'Bulk domain discounts',
            ].map((f, i) => (
              <div key={i} className="bg-primary text-white p-4 rounded-lg">
                ✅ {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          How Domain Registration Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            {
              step: 'Search Domain',
              desc: 'Use our tool to find the best domain.',
            },
            {
              step: 'Register Securely',
              desc: 'Register in minutes with secure checkout.',
            },
            {
              step: 'Manage Easily',
              desc: 'Access your domain panel anytime.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border shadow-sm dark:bg-gray-900 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-2">{item.step}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Rahim Uddin',
                quote:
                  'Super fast and easy domain registration! Everything was done in 5 minutes.',
                avatar: '/images/vps/testi1.jpg',
              },
              {
                name: 'Maria Khan',
                quote:
                  'Very affordable and great support when I had issues updating DNS records.',
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
                    className="rounded-full border-2 border-primary"
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
              question: 'How long does domain registration take?',
              answer:
                'Domain registration is usually completed within a few minutes.',
            },
            {
              question: 'Can I transfer my domain later?',
              answer:
                'Yes, domains can be transferred anytime with proper authorization.',
            },
            {
              question: 'Do you provide WHOIS privacy?',
              answer: 'Yes, WHOIS privacy is free for all eligible domains.',
            },
          ].map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
              <hr className="mt-4" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Secure Your Domain Today</h2>
        <p className="text-lg mb-6">
          Don’t miss the perfect name — it may not be available tomorrow!
        </p>
        <Link
          href="#"
          className="bg-white text-primary px-6 py-3 font-semibold rounded-lg inline-block hover:bg-primary hover:text-white transition border-2 border-transparent"
        >
          Search Now
        </Link>
      </section>
    </div>
  );
}