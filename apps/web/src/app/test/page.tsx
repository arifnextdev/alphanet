import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className="bg-[#0f0c1f] text-white font-sans">
        {/* Header */}
        <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div className="text-2xl font-bold">AI Tool</div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="hover:text-purple-400">
              Home
            </Link>
            <Link href="#features" className="hover:text-purple-400">
              Features
            </Link>
            <Link href="#" className="hover:text-purple-400">
              Pricing
            </Link>
            <Link href="#" className="hover:text-purple-400">
              Support
            </Link>
          </nav>
          <div className="flex space-x-4">
            <button className="text-sm">Sign In</button>
            <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 text-sm">
              Get Started
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-24 px-6 bg-gradient-to-b from-purple-800/20 via-purple-900/40 to-transparent">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            LiteSpeed <br /> Web Server License in Bangladesh
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
            Highly customizable features for SEO, grammar, tone, and more.
            Empower your content creation with automation and AI.
          </p>
          <button className="bg-purple-600 px-6 py-3 rounded hover:bg-purple-700 text-white">
            Start for Free
          </button>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features of Our Tool
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Intelligent Writing Assistance',
              'Grammar and Spell Check',
              'Plagiarism Detection',
              'Voice-to-Text Conversion',
              'Tone and Voice Adaptation',
              'Content Generation',
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-purple-900/30 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                <p className="text-sm text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-6 bg-purple-900/10">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Pricing Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Starter',
                price: '$10',
                features: ['Basic Access', 'Limited Content Generation'],
              },
              {
                title: 'Medium',
                price: '$59',
                features: ['Standard Tools', 'More Generation Limits'],
              },
              {
                title: 'Business',
                price: '$289',
                features: ['Full Access', 'Priority Support'],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className="bg-purple-900/20 p-8 rounded-xl text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-4xl font-bold mb-4">
                  {plan.price}
                  <span className="text-base font-medium">/month</span>
                </p>
                <ul className="text-sm text-gray-300 mb-6">
                  {plan.features.map((item, i) => (
                    <li key={i} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-purple-900/10 p-6 rounded-xl">
                <p className="text-sm mb-4 text-gray-300">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”
                </p>
                <div className="text-sm font-bold">User {i + 1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 px-6 bg-purple-900/10">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest Blogs & News
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              'Revolution in Content Creation',
              'How AI Writing Empowers Writers',
              'Next-gen Communication',
            ].map((title, idx) => (
              <div key={idx} className="bg-purple-900/10 p-4 rounded-xl">
                <div className="h-40 bg-purple-700 rounded mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-300">
                  Brief overview of the blog content to engage users.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Contact With Us
          </h2>
          <form className="max-w-xl mx-auto space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded bg-purple-900/20 text-white placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-purple-900/20 text-white placeholder-gray-400"
            />
            <textarea
              placeholder="Your message"
              className="w-full p-3 rounded bg-purple-900/20 text-white placeholder-gray-400"
            ></textarea>
            <button className="bg-purple-600 px-6 py-3 rounded hover:bg-purple-700 text-white">
              Send Message
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="bg-purple-950 py-12 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} AI Tool. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default page;
