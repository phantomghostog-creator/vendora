'use client';

import React, { useState } from 'react';
import { Check, X, Star, ShieldCheck, ArrowRight, Zap, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import FAQ from './FAQ';

const plans = [
  {
    name: 'Starter',
    price: 15,
    shopifyPrice: 25,
    description: 'Perfect for new sellers and side hustles.',
    features: [
      'Unlimited products',
      'Advanced store builder',
      '0% Transaction fees',
      'Standard checkout',
      '2 Admin accounts',
      'Basic analytics',
      'Community support',
    ],
    notIncluded: [
      'Abandoned cart recovery',
      'Custom domains',
      'Professional reports',
      'International markets',
    ],
    cta: 'Start Selling',
    color: 'blue',
    testimonial: {
      text: "Switched from Shopify Basic and saved $120/year instantly. Same features, better UI.",
      author: "Alex Rivera",
      role: "Digital Artist"
    }
  },
  {
    name: 'Professional',
    price: 43,
    shopifyPrice: 45,
    popular: true,
    description: 'The sweet spot for growing brands.',
    features: [
      'Everything in Starter',
      'Abandoned cart recovery',
      'Custom domains & SSL',
      'Professional reports',
      '5 Admin accounts',
      'Inventory management',
      'Priority email support',
      'Facebook & Google ads integration',
    ],
    notIncluded: [
      'Custom shipping rates',
      'Duty and import taxes',
    ],
    cta: 'Scale Now',
    color: 'purple',
    testimonial: {
      text: "The abandoned cart recovery alone paid for the subscription in the first week.",
      author: "Sarah Chen",
      role: "E-commerce Founder"
    }
  },
  {
    name: 'Enterprise',
    price: 297,
    shopifyPrice: 299,
    description: 'Advanced features for high-volume stores.',
    features: [
      'Everything in Professional',
      'Custom shipping rates',
      'Duty and import taxes',
      '15 Admin accounts',
      'Custom reporting API',
      '24/7 Dedicated account manager',
      '0.5% lower credit card rates',
      '99.99% Uptime SLA',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    color: 'pink',
    testimonial: {
      text: "Handles our Black Friday traffic without breaking a sweat. Support is phenomenal.",
      author: "Marcus Thorne",
      role: "Operations Director"
    }
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      return Math.round(monthlyPrice * 10 / 12); // 2 months free = 10 months total
    }
    return monthlyPrice;
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Transparent pricing, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">no surprises.</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Stop giving your margins to Shopify. Join thousands of sellers who switched and saved.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-bold", !isAnnual ? "text-gray-900" : "text-gray-400")}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-gray-200 rounded-full relative p-1 transition-colors hover:bg-gray-300"
            >
              <div className={cn(
                "w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 transform",
                isAnnual ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-bold", isAnnual ? "text-gray-900" : "text-gray-400")}>Annual</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                2 Months Free
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
                plan.popular ? "border-purple-200 bg-purple-50/30 scale-105 z-10" : "border-gray-100 bg-white"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">${calculatePrice(plan.price)}</span>
                  <span className="text-gray-500 font-medium">/mo</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-bold">
                  <span className="text-gray-400 line-through">Shopify: ${plan.shopifyPrice}/mo</span>
                  <span className="text-green-600 text-[10px] bg-green-50 px-1.5 py-0.5 rounded">
                    Save ${plan.shopifyPrice - plan.price}/mo
                  </span>
                </div>
              </div>

              <button className={cn(
                "w-full py-4 rounded-xl font-bold mb-8 transition-all flex items-center justify-center gap-2",
                plan.color === 'blue' ? "bg-blue-600 text-white hover:bg-blue-700" :
                plan.color === 'purple' ? "bg-purple-600 text-white hover:bg-purple-700" :
                "bg-gray-900 text-white hover:bg-black"
              )}>
                {plan.cta}
                <ArrowRight size={18} />
              </button>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 text-green-600 rounded-full p-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 opacity-40">
                    <div className="mt-1 bg-gray-100 text-gray-400 rounded-full p-0.5">
                      <X size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-xs text-gray-600 italic mb-4">&quot;{plan.testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-900">{plan.testimonial.author}</p>
                    <p className="text-[10px] text-gray-400">{plan.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">Feature Comparison</h3>
            <p className="text-gray-500">See exactly why Vendora is the right choice for your business.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-6 text-sm font-bold text-gray-900 border-b border-gray-100">Feature</th>
                  <th className="p-6 text-sm font-bold text-blue-600 border-b border-gray-100 bg-blue-50/30">Vendora</th>
                  <th className="p-6 text-sm font-bold text-gray-400 border-b border-gray-100">Competitors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { title: 'Transaction Fees', vendora: '0%', competitors: 'Up to 2.0%' },
                  { title: 'Store Customization', vendora: 'Drag-and-drop included', competitors: 'Paid themes ($200+)' },
                  { title: 'Digital Products', vendora: 'Native support', competitors: 'Paid apps required' },
                  { title: 'Analytics', vendora: 'Real-time dashboard', competitors: 'Varies by tier' },
                  { title: 'Abandoned Cart', vendora: 'Included on Pro+', competitors: 'Paid apps required' },
                  { title: 'Support', vendora: '24/7 Human support', competitors: 'Bot-first/Slow' },
                ].map((row) => (
                  <tr key={row.title} className="hover:bg-gray-50/30 transition-colors">
                    <td className="p-6 text-sm font-medium text-gray-700">{row.title}</td>
                    <td className="p-6 text-sm font-bold text-gray-900">{row.vendora}</td>
                    <td className="p-6 text-sm text-gray-500">{row.competitors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guarantee Badge */}
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-3xl border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try any plan risk-free. If you&apos;re not completely satisfied with your store performance, we&apos;ll refund every penny. No questions asked.
          </p>
        </div>

        <div className="mt-24">
           <FAQ />
        </div>
      </div>
    </section>
  );
}
