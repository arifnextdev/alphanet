import { Globe, Headset, Server, ShieldAlert } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Alpha Net',
  description:
    'Learn more about Alpha Net - Bangladesh’s premier hosting provider.',
};

export default function AboutPage() {
  return (
    <main className=" text-primary py-24 px-4 sm:px-6 lg:px-8">
      <section className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-bold mb-4 text-purple-500">Who We Are</h1>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          Alpha Net is a trusted provider of web hosting, cloud services, and
          enterprise IT solutions. For over a decade, we’ve helped thousands of
          businesses go online with confidence.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 mb-24">
        <div>
          <h2 className="text-3xl font-semibold mb-3 text-purple-400">
            Our Mission
          </h2>
          <p className="text-secondary">
            To empower businesses through reliable, scalable, and secure digital
            infrastructure. We aim to simplify the technology so you can focus
            on what matters most—your growth.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-3 text-purple-400">
            Our Vision
          </h2>
          <p className="text-secondary">
            To be Bangladesh’s most innovative and customer-centric hosting
            provider, recognized globally for performance and trust.
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-4xl font-bold text-purple-500 mb-10">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[
            {
              icon: <Server size={32} />,
              title: 'High-Performance Servers',
              desc: 'NVMe SSD-powered servers with 99.9% uptime.',
            },
            {
              icon: <ShieldAlert size={32} />,
              title: 'Top-Notch Security',
              desc: 'Firewall, DDoS protection & free SSL on all plans.',
            },
            {
              icon: <Globe size={32} />,
              title: 'Global Infrastructure',
              desc: 'Data centers in Bangladesh, USA, Singapore, and Europe.',
            },
            {
              icon: <Headset size={32} />,
              title: '24/7 Support',
              desc: 'Real-time assistance via live chat, phone & email.',
            },
          ].map((item, index) => (
            <div key={index} className="p-6 bg-muted/10 rounded-xl shadow-md">
              <div className="text-purple-400 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team CTA */}
      <section className="bg-muted/10 p-10 rounded-xl max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-purple-500 mb-4">
          Join Our Mission
        </h2>
        <p className="text-secondary mb-6">
          We’re more than a tech company—we’re a community. Join us in building
          the future of digital infrastructure in Bangladesh.
        </p>
        <a
          href="/contact"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg text-white font-semibold"
        >
          Let’s Connect
        </a>
      </section>
    </main>
  );
}
