import FirstCard from '@/components/customs/card/FirstCard';
import SectionTitle from '@/components/global/SectionTitle';
import CTA from '@/components/sections/CTA';
import Hero from '@/components/sections/Hero';
import OurServices from '@/components/sections/OurServices';
import PricingSection from '@/components/sections/Package';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

export default function AIToolLandingPage() {
  return (
    <main className=" ">
      <Hero />
      <OurServices />
      <PricingSection />
      <WhyChooseUs />
      <Testimonials />
      <Team />
      <CTA />
    </main>
  );
}
