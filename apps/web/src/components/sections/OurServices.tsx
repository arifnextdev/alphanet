'use client';

import { cn } from '@/lib/utils';
import { BadgeCheck, Server, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import FirstCard from '../customs/card/FirstCard';

const services = [
  {
    icon: <Server className="h-8 w-8 text-seconday" />,
    title: 'Web Hosting',
    description:
      'Fast, secure, and scalable web hosting solutions for all types of websites.',
  },
  {
    icon: <Globe className="h-8 w-8 text-seconday" />,
    title: 'Domain Registration',
    description:
      'Register your perfect domain name with a wide variety of extensions.',
  },
  {
    icon: <BadgeCheck className="h-8 w-8 text-seconday" />,
    title: 'Business Email',
    description:
      'Professional email hosting with your domain to build trust with clients.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-seconday" />,
    title: 'SSL Certificates',
    description:
      'Secure your website and boost SEO with industry-standard SSL certificates.',
  },
];

const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="group rounded-2xl border border-border bg-accent/10 p-6 shadow-sm transition hover:shadow-md hover:border-primary space-y-3 duration-300">
    <div className="text-xl ">
      <span className="">{icon}</span>
    </div>
    <div className="w-full h-[1px] bg-gradient-to-r from-primary/70 via-transparent to-transparent group-hover:to-primary group-hover:via-primary duration-300 ease-in-out"></div>
    <h3 className="text-xl font-semibold text-primary">{title}</h3>
    <p className="mt-2 text-sm text-secondary/70">{description}</p>

    <Button className="">Learn More</Button>
  </div>
);

const OurServices = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Our Services
        </h2>
        <p className="mt-4 text-lg text-secondary/70">
          Explore our powerful tools that help you grow your online presence.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <FirstCard key={index} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button variant="default">Explore All Services</Button>
      </div>
    </section>
  );
};

export default OurServices;
