import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Alpha Net</h2>
          <p className="text-sm text-gray-400 mb-4">
            Reliable hosting solutions for startups, developers, and
            enterprises. Powering growth since 2001.
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Alpha Net. All rights reserved.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/hosting" className="hover:text-blue-500">
                Web Hosting
              </a>
            </li>
            <li>
              <a href="/vps" className="hover:text-blue-500">
                VPS Hosting
              </a>
            </li>
            <li>
              <a href="/dedicated-server" className="hover:text-blue-500">
                Dedicated Servers
              </a>
            </li>
            <li>
              <a href="/cloud" className="hover:text-blue-500">
                Cloud Hosting
              </a>
            </li>
            <li>
              <a href="/email" className="hover:text-blue-500">
                Business Email
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/contact" className="hover:text-blue-500">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-500">
                About Us
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-blue-500">
                Blog
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-blue-500">
                FAQs
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-blue-500">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>📍 Block-C, Sayed Nagar, Vatara, Dhaka-1212</li>
            <li>
              📞{' '}
              <a href="tel:+8801724097877" className="hover:text-blue-500">
                +8801724097877
              </a>
            </li>
            <li>
              ✉️{' '}
              <a
                href="mailto:arif171042@gmail.com"
                className="hover:text-blue-500"
              >
                arif171042@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
        Made with ❤️ by Alpha Net. Powered by modern web technology.
      </div>
    </footer>
  );
};

export default Footer;
