'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping (free for orders over $100) takes 1-2 business days."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary between 7-14 business days depending on location."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 90-day money-back guarantee. If you're not satisfied, return the item in its original packaging for a full refund."
  },
  {
    question: "Is there a warranty on products?",
    answer: "All our electronics come with a standard 2-year warranty covering manufacturing defects."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">FAQ</h2>
          <p className="text-3xl lg:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center transition-colors hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-gray-400" />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
