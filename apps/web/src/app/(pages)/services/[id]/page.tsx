import dynamic from 'next/dynamic';
const ServicePage = dynamic(
  () => import('@/app/(pages)/services/_components/ServicePage'),
);

const serviceData = {
  hero: {
    title: 'Expert Software & Web Services',
    subtitle:
      'We build tailored solutions for startups, enterprises, and visionaries.',
    buttonText: 'Get Free Quote',
  },
  services: [
    {
      title: 'Web Development',
      description: 'Responsive, SEO-friendly, and blazing-fast web apps.',
      icon: '🌐',
    },
    {
      title: 'Mobile Apps',
      description:
        'iOS & Android apps using Flutter, React Native, or native tech.',
      icon: '📱',
    },
    {
      title: 'Custom API',
      description:
        'REST & GraphQL APIs with robust authentication and scalability.',
      icon: '🔌',
    },
    {
      title: 'DevOps & Hosting',
      description: 'CI/CD, cloud deployment, Docker, and server optimization.',
      icon: '⚙️',
    },
  ],
  about: {
    title: 'We Dont Just Build — We Solve.',
    description:
      'Our team blends creativity, engineering, and strategy to solve real-world problems. We craft digital products that are functional, scalable, and future-ready.',
    image: '/images/about-us.png',
  },
  features: [
    'Dedicated project manager',
    'Full-stack development team',
    'Scalable architecture',
    'Post-launch support & monitoring',
    'Agile delivery process',
    'Security & performance optimized',
  ],
  testimonials: [
    {
      name: 'Sarah Wilson',
      quote:
        'Their team took our idea and made it a beautiful, functional app. Truly a dream to work with.',
      avatar: '/images/avatar1.png',
    },
    {
      name: 'Liam Carter',
      quote:
        'Reliable, innovative, and professional. Highly recommended for any startup.',
      avatar: '/images/avatar2.png',
    },
  ],
  faqs: [
    {
      question: 'How do you price your services?',
      answer:
        'We offer both fixed and hourly packages depending on your scope and budget.',
    },
    {
      question: 'Can you help maintain my website/app after launch?',
      answer: 'Absolutely! We offer maintenance plans and flexible retainers.',
    },
  ],
  cta: {
    title: 'Lets Build Something Great Together!',
    subtitle: 'Start your project consultation with our expert team.',
    buttonText: 'Schedule a Call',
  },
};

export default function Page() {
  return <ServicePage {...serviceData} />;
}
