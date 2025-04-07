import FirstCard from '@/components/customs/card/FirstCard';
import Hero from '@/components/sections/Hero';
import Link from 'next/link';
import React from 'react';

export default function AIToolLandingPage() {
  return (
    <main className=" ">
      <Hero />
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8  my-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <FirstCard key={index} />
        ))}
      </div>
    </main>
  );
}
