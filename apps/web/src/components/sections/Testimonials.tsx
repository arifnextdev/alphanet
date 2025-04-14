'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Khan',
    role: 'CEO, TechNova',
    feedback:
      'Working with this team was an absolute pleasure. The project was delivered on time and exceeded all expectations.',
    avatar: '/avatars/avatar1.png',
  },
  {
    name: 'James Smith',
    role: 'Marketing Manager, BrightAds',
    feedback:
      'Their attention to detail and customer support is unmatched. Highly recommend them for any digital solution.',
    avatar: '/avatars/avatar2.png',
  },
  {
    name: 'Anika Rahman',
    role: 'Founder, EduSmart',
    feedback:
      'Professional, reliable, and super creative! They turned my idea into a product that users love.',
    avatar: '/avatars/avatar3.png',
  },
];

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const TestimonialCard = ({
  avatar,
  name,
  role,
  feedback,
}: {
  avatar: string;
  name: string;
  role: string;
  feedback: string;
}) => (
  <div className="rounded-xl border border-border bg-muted/30 p-6 shadow-sm hover:bg-muted/40 transition">
    <StarRating />
    <p className="mt-4 text-base text-secondary/80 italic">{feedback}</p>
    <div className="mt-6 flex items-center gap-4">
      <Image
        src={avatar}
        alt={name}
        width={48}
        height={48}
        className="h-12 w-12 rounded-full border border-border object-cover"
      />
      <div>
        <p className="font-semibold text-primary">{name}</p>
        <p className="text-sm text-secondary/60">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-primary sm:text-5xl">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-lg text-secondary/70">
          Real feedback from real clients who loved working with us.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
