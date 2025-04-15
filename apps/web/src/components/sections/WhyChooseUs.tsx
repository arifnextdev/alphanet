'use client';

import { Clock, DollarSign, Lightbulb, ThumbsUp } from 'lucide-react';
import SecondCard from '../customs/card/secondCard';
import SectionTitle from '../global/SectionTitle';

const reasons = [
  {
    icon: <Lightbulb className="h-7 w-7 text-primary" />,
    title: 'Innovative Solutions',
    description:
      'We always stay ahead by offering modern and scalable technologies.',
  },
  {
    icon: <ThumbsUp className="h-7 w-7 text-primary" />,
    title: 'Trusted by Clients',
    description:
      'Our long-term partnerships prove our reliability and commitment.',
  },
  {
    icon: <Clock className="h-7 w-7 text-primary" />,
    title: '24/7 Support',
    description: 'We’re here for you any time, any day – guaranteed support.',
  },
  {
    icon: <DollarSign className="h-7 w-7 text-primary" />,
    title: 'Affordable Pricing',
    description:
      'Get the best value without compromising on quality or performance.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <SectionTitle
          title="Why Choose Us"
          desc="We are a trusted provider of web hosting, cloud services, and enterprise IT solutions."
        />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((item, index) => (
          <SecondCard key={item.title + index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
