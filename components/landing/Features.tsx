import { ShieldCheck, Truck, RotateCcw, Clock } from 'lucide-react';

const features = [
  {
    icon: <Truck className="text-blue-600" size={32} />,
    title: "Free Express Shipping",
    description: "Orders over $100 qualify for free 2-day delivery across the country."
  },
  {
    icon: <ShieldCheck className="text-blue-600" size={32} />,
    title: "2-Year Warranty",
    description: "Every product we sell comes with a standard 2-year replacement guarantee."
  },
  {
    icon: <RotateCcw className="text-blue-600" size={32} />,
    title: "90-Day Returns",
    description: "Not satisfied? Return your item within 90 days for a full, no-questions-asked refund."
  },
  {
    icon: <Clock className="text-blue-600" size={32} />,
    title: "24/7 Support",
    description: "Our dedicated team is here to help you anytime, anywhere, via chat or email."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Why Choose Us</h2>
          <p className="text-3xl lg:text-4xl font-extrabold text-gray-900">Experience Excellence in Every Purchase</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
