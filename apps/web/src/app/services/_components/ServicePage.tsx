'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';

type ServicePageProps = {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  about: {
    title: string;
    description: string;
    image: string;
  };
  features: string[];
  testimonials: {
    name: string;
    quote: string;
    avatar: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
};

export default function ServicePage({
  hero,
  services,
  about,
  features,
  testimonials,
  faqs,
  cta,
}: ServicePageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="b mt-20">
      {/* Hero */}
      <section className="py-24 text-center  px-4">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-bl from-primary/70 via-primary to-primary/70 bg-clip-text text-transparent">
          {hero.title}
        </h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">{hero.subtitle}</p>
        <Button className="">{hero.buttonText}</Button>
      </section>

      {/* Services */}
      <section className=" max-w-6xl mx-auto py-16 px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, i) => (
          <div
            key={i}
            className="border border-primary/20 p-6 rounded-xl text-center shadow-md hover:shadow-blue-500/30 transition"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="font-bold text-xl mb-2">{service.title}</h3>
            <p className=" text-sm">{service.description}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-2 gap-12 items-center">
        <Image
          src={about.image}
          alt="About Us"
          width={600}
          height={400}
          className="rounded-xl border border-primary/20 shadow-sm shadow-primary mb-6 md:mb-0"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">{about.title}</h2>
          <p className=" mb-6">{about.description}</p>
          <Button>Explore More</Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-secondary/70">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {features.map((feature, i) => (
              <li
                key={i}
                className="bg-primary p-4 rounded-lg  shadow  transition"
              >
                ✅ {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Client Feedback</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className=" p-6 rounded-xl shadow-md text-left">
                <p className="italic mb-4 ">"{t.quote}"</p>
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
              {activeFaq === i && <p className="mt-2 ">{faq.answer}</p>}
              <hr className="mt-4 " />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-primary py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
        <p className="text-lg mb-6">{cta.subtitle}</p>
        <Button variant={'outline'} className="text-primary dark:bg-white">
          {cta.buttonText}
        </Button>
      </section>
    </div>
  );
}
