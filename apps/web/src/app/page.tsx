import CTA from '@/components/sections/CTA';
import DynamicHero from '@/components/sections/DynamicHero';
import OurServices from '@/components/sections/OurServices';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

export default function AIToolLandingPage() {
  return (
    <main className=" ">
      <DynamicHero />
      <OurServices />
      {/* <PricingSection /> */}
      <WhyChooseUs />
      <Testimonials />
      <Team />
      <CTA />
    </main>
  );
}
