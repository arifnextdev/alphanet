'use client';

import FirstCard from '../customs/card/FirstCard';
import { Button } from '../ui/button';

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
