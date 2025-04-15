'use client';

import React from 'react';
import Link from 'next/link';

export default function HostingPage() {
  return (
    <div className="pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 text-center bg-gray-50 dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Reliable Web Hosting Services
        </h1>
        <p className="text-lg mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Fast, secure, and scalable hosting plans to power your website.
        </p>
        <Link
          href="#plans"
          className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded font-medium hover:bg-primary/90"
        >
          View Plans
        </Link>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
            Hosting Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: '$2.99/mo',
                features: [
                  '1 Website',
                  '10GB Storage',
                  'Free SSL',
                  '24/7 Support',
                ],
              },
              {
                name: 'Pro',
                price: '$5.99/mo',
                features: [
                  '10 Websites',
                  '50GB Storage',
                  'Free Domain',
                  'Free SSL',
                  'Priority Support',
                ],
              },
              {
                name: 'Business',
                price: '$9.99/mo',
                features: [
                  'Unlimited Websites',
                  'Unlimited Storage',
                  'Free Domain & SSL',
                  'Daily Backups',
                  'Premium Support',
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
              >
                <h3 className="text-xl font-bold text-primary mb-4">
                  {plan.name}
                </h3>
                <p className="text-3xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
                  {plan.price}
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i}>✔ {f}</li>
                  ))}
                </ul>
                <button className="bg-primary text-white w-full py-2 rounded hover:bg-primary/90">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10">
            Hosting Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Blazing Fast Speed',
                desc: 'Our servers are optimized for maximum speed and performance.',
              },
              {
                title: '99.9% Uptime Guarantee',
                desc: 'Stay online with reliable hosting infrastructure.',
              },
              {
                title: '24/7 Expert Support',
                desc: 'Get help anytime from our hosting experts.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-6 rounded shadow text-left border border-gray-200 dark:border-gray-700"
              >
                <h4 className="text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            {[
              'Affordable pricing for all types of businesses.',
              'Secure servers and daily backups.',
              'Easy-to-use control panel.',
              '30-day money-back guarantee.',
            ].map((reason, i) => (
              <div key={i} className="flex items-start space-x-4">
                <span className="text-green-600 text-xl">✔</span>
                <p className="text-gray-700 dark:text-gray-300">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
            What Our Customers Say
          </h2>
          <div className="space-y-8">
            {[
              {
                name: 'Sarah J.',
                feedback:
                  'Alpha Net hosting has been rock-solid. I’ve never faced downtime in the past year!',
              },
              {
                name: 'Michael R.',
                feedback:
                  'Their support is amazing. They solved my issue within minutes!',
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-6 rounded shadow border border-gray-200 dark:border-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.feedback}"
                </p>
                <p className="text-sm font-semibold mt-4 text-primary">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
            FAQs
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'What is web hosting?',
                a: 'Web hosting is a service that allows you to publish your website on the internet.',
              },
              {
                q: 'Can I upgrade my plan later?',
                a: 'Yes, you can upgrade or downgrade your plan at any time.',
              },
              {
                q: 'Do you offer money-back guarantee?',
                a: 'Yes, we offer a 30-day money-back guarantee on all plans.',
              },
            ].map((item, i) => (
              <div key={i}>
                <h4 className="font-semibold text-primary">{item.q}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-2 mb-6 text-lg">
          Choose a plan that suits your needs and launch your website today!
        </p>
        <Link
          href="#plans"
          className="bg-white text-primary px-6 py-3 rounded font-medium"
        >
          View Hosting Plans
        </Link>
      </section>
    </div>
  );
}
