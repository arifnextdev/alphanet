'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapIcon, MessageSquareIcon, Phone, Copy, Check } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form);
    // Add API call or email sending here
  };

  const handleCopy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="text-primary py-24 px-4 sm:px-6 lg:px-8">
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        {/* Contact Form */}
        <div>
          <h1 className="text-4xl font-bold text-purple-500 mb-6">
            Send a Message
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="name"
              className="py-8 placeholder:text-lg"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              className="py-8 placeholder:text-lg"
              placeholder="Your Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              className=" placeholder:text-lg min-h-[100px]"
              placeholder="Your Message"
              rows={10}
              value={form.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full text-lg py-6">
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <ContactCard
            icon={<Phone className="text-purple-400 mt-1" size={20} />}
            title="Phone"
            value="+880 1712 345 678"
            copied={copied}
            onCopy={() => handleCopy('Phone', '+880 1712 345 678')}
          />
          <ContactCard
            icon={
              <MessageSquareIcon className="text-purple-400 mt-1" size={20} />
            }
            title="Email"
            value="support@alphanet.com.bd"
            copied={copied}
            onCopy={() => handleCopy('Email', 'support@alphanet.com.bd')}
          />
          <ContactCard
            icon={<MapIcon className="text-purple-400 mt-1" size={20} />}
            title="Office"
            value="Block-C, Sayed Nagar, Vatara, Dhaka-1212"
            copied={copied}
            onCopy={() =>
              handleCopy('Office', 'Block-C, Sayed Nagar, Vatara, Dhaka-1212')
            }
          />

          {/* Optional: Add social links */}
        </div>
      </section>
      <div className="mt-10 w-full flex justify-center items-center">
        <div className="pt-4 flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  copied: string | null;
  onCopy: () => void;
};

function ContactCard({ icon, title, value, copied, onCopy }: ContactCardProps) {
  return (
    <Card className="bg-muted/10">
      <CardContent className="p-3 flex items-start gap-4 justify-between">
        <div className="flex gap-4">
          {icon}
          <div>
            <h4 className="font-semibold text-secondary">{title}</h4>
            <p className="text-secondary text-sm">{value}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCopy}
          title="Copy"
          className="text-muted-foreground"
        >
          {copied === title ? (
            <Check className="text-green-500" size={16} />
          ) : (
            <Copy size={16} />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
