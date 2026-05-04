import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>New products just arrived</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              Elevate Your <span className="text-blue-600">Digital Lifestyle</span> with Premium Gear
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover a curated collection of high-performance tech accessories designed for modern professionals and creators. Built to last, engineered for excellence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <Link href="#products" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-200">
                Shop Collection <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-gray-900 border border-gray-200 font-bold text-lg hover:bg-gray-50 transition-all">
                Learn More
              </Link>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 font-medium">Trusted by 10,000+ customers</p>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop" 
                alt="Product Preview" 
                className="w-full h-auto"
              />
            </div>
            {/* Urgency element */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:block animate-bounce">
              <p className="text-sm font-bold text-gray-900">🔥 12 items left in stock</p>
              <p className="text-xs text-gray-500">Selling fast this week</p>
            </div>
          </div>
        </div>
      </div>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl opacity-50 z-0"></div>
    </section>
  );
}
