'use client';

import { Button } from '@/components/ui/button';
import SectionTitle from '../global/SectionTitle';

const CTA = () => {
  return (
    <section className="relative z-10 bg-muted/20 py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <SectionTitle
          title="Ready to Start Your Project"
          desc="Let's collaborate and bring your ideas to life. Contact us today!"
        />

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
