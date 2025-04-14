'use client';

import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="relative z-10 bg-muted/20 py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-primary sm:text-5xl">
          Ready to Start Your Project?
        </h2>
        <p className="mt-4 text-lg text-secondary/70">
          Let’s collaborate and bring your ideas to life. Contact us today!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button className="text-lg px-8 py-6">Contact Us</Button>
          <Button
            variant="outline"
            className="text-secondary-foreground text-lg px-8 py-6"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
