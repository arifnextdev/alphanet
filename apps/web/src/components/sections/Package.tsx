'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import SectionTitle from '../global/SectionTitle';

type Plan = {
  title: string;
  price: string;
  description: string;
  button: string;
  highlighted?: boolean;
  features: string[];
};

type PlanData = {
  monthly: Plan[];
  annually: Plan[];
};

const planData: PlanData = {
  monthly: [
    {
      title: 'Personal',
      price: '$18',
      description: 'Highly-efficient for your personal',
      button: 'Start Free Trial',
      features: [
        'RTX enabled A10G Tensor Core GPUs',
        'Free weekly backups database',
        'Transfer images over high-speed HTTPs',
        '2 Device connect in cloud',
      ],
    },
    {
      title: 'Team',
      price: '$23',
      description: 'Simple and easy manage for your team',
      button: 'Get Started',
      highlighted: true,
      features: [
        '4.0 GHz INTEL Processors',
        'Free daily backups database',
        'Transfer images over high-speed HTTPs',
        '50 Device connect in cloud',
        'Shared Teams Folder',
      ],
    },
    {
      title: 'Scale',
      price: 'Custom',
      description: 'Highly-efficient for your department',
      button: 'Contact Sales Team',
      features: [
        'Custom your processor',
        'Free daily backups database',
        'Single sign-on (SSO & SAML)',
        'Company space for collaboration',
      ],
    },
  ],
  annually: [
    {
      title: 'Personal',
      price: '$14',
      description: 'Highly-efficient for your personal',
      button: 'Start Free Trial',
      features: [
        'RTX enabled A10G Tensor Core GPUs',
        'Free weekly backups database',
        'Transfer images over high-speed HTTPs',
        '2 Device connect in cloud',
      ],
    },
    {
      title: 'Team',
      price: '$19',
      description: 'Simple and easy manage for your team',
      button: 'Get Started',
      highlighted: true,
      features: [
        '4.0 GHz INTEL Processors',
        'Free daily backups database',
        'Transfer images over high-speed HTTPs',
        '50 Device connect in cloud',
        'Shared Teams Folder',
      ],
    },
    {
      title: 'Scale',
      price: 'Custom',
      description: 'Highly-efficient for your department',
      button: 'Contact Sales Team',
      features: [
        'Custom your processor',
        'Free daily backups database',
        'Single sign-on (SSO & SAML)',
        'Company space for collaboration',
      ],
    },
  ],
};

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
    'monthly',
  );

  const plans = planData[billingCycle];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <SectionTitle
        title="Our Pricing Plans"
        desc="Choose a plan that fits your needs"
      />
      <div className="flex justify-center mb-8">
        <div className="inline-flex border rounded-full bg-white shadow-sm">
          <button
            className={`px-4 py-1 text-sm font-medium rounded-full transition ${
              billingCycle === 'annually'
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setBillingCycle('annually')}
          >
            Billed Annually
          </button>
          <button
            className={`px-4 py-1 text-sm font-medium rounded-full transition ${
              billingCycle === 'monthly'
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Billed Monthly
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <Card
            key={idx}
            className={`flex flex-col justify-between border transition-transform duration-300 hover:scale-105 ${
              plan.highlighted ? 'bg-[#1c143f] text-white' : 'bg-white'
            }`}
          >
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
              <div className="flex items-end space-x-1 mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm font-medium">/Month</span>
              </div>
              <p className="text-sm mb-6">{plan.description}</p>
              <Button
                variant={plan.highlighted ? 'default' : 'outline'}
                className="w-full mb-6"
              >
                {plan.button}
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-purple-500 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
